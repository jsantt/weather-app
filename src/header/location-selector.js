import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

import {CITIES, TOP_10_CITIES} from './city-list';

/**
 * @customElement
 * @polymer
 */
class LocationSelector extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        --paper-spinner-color:var(--color-palette-blue); 
        
        display: inline-block;
        color: var(--color-black);
        font-size: 1.563rem;
        
        margin: 0 0 0.2rem 0;
	    	text-align: center;	   
      }

      vaadin-combo-box {
        /* overwriting Vaadin's default styles */
        --lumo-contrast-10pct: transparent;        
        --lumo-font-size-m: var(--font-size-large);
        --lumo-font-family: 'Open Sans Condensed', sans-serif;
        --vaadin-text-field-default-width: 10.5rem;
      }

      .locate {
        margin-left: .6rem;
      }

      .locate_loadIcon {
        padding: 0 0.6rem;
      }

    </style>

    
    <div class="locate" id="locate">
        
        <template is="dom-if" if="[[loading]]">
          <paper-spinner-lite class="locate_loadIcon" active=""></paper-spinner-lite>
        </template>

        <template is="dom-if" if="[[!loading]]">
          <vaadin-combo-box
            id="placeSelection"
            item-label-path="city"
            item-value-path="coordinates"
            on-opened-changed="_openedChanged">
           
            <template>
              
              <template is="dom-if" if="[[_isHighlighted(index)]]">
                <div>[[item.city]]</div>
              </template>
              <template is="dom-if" if="[[!_isHighlighted(index)]]">
                <div style="color:#916c25;">[[item.city]]</div>
              </template>
      
            </template>
          </vaadin-combo-box>

        </template>
    </div>
`;
  }

  static get is() { return 'location-selector'; }

  static get properties() {
    return {
      _defaultPlace: {
        type: Object,
        value:  {city: "Helsinki", coordinates: "60.1698557,24.9383791"},
        readOnly: true
      },
      _previousPlace: {
        type: Object
      },
      loading: {
        type: Boolean
      },
      place: {
        type: Object,
        observer: '_newPlace'
      }
    };
  }

  ready() {
    super.ready();

    const storedPlaces = this._getFromLocalStorage('place');
    let currentPlace;

    if(storedPlaces) {
      currentPlace = storedPlaces[0];
    }
    else {  
      currentPlace = this._defaultPlace;
      this._storeIntoLocalStorage('place', TOP_10_CITIES);
    }

    // TO DO: UGLY HACK, without timeout parent won't catch the event
    setTimeout(() => {
    this._dispatchEvent('location-selector.location-changed', currentPlace);
    }, 1);
  }

  _setComboboxValue(value) {
    
    setTimeout(()=> {
      let combobox = this.shadowRoot.querySelector('#placeSelection');
      
      if(combobox) {
        combobox.selectedItem = value;
      }
    }, 1000);
  }

  /**
   * When customer chooses geolocate, we need to wait response containing place name
   */
  _newPlace(){
    
    let combobox = this.shadowRoot.querySelector('#placeSelection');
    
    console.log('place name: ' + this.place);
    console.dir(this.place);

    if(combobox) {
      combobox.selectedItem = this.place.name

      const url = this.place.name;
      
      this._changeUrl('place', url);
      this._store('place', this.place.name, this.place.coordinates);

      combobox.items = this._placeList();
    }
    else {
      setTimeout(()=> {
        this._newPlace();
      }, 1000);
    }
    
    
  }

  _isHighlighted(index) {
    return index < 10;
  }

  _openedChanged(customEvent) {
    console.log(customEvent);
    let combobox = this.shadowRoot.querySelector('#placeSelection');

    if(this._isComboboxOpen(customEvent)) {
      combobox.focus();
      this._previousPlace = combobox.selectedItem; //this._formPlaceObject(this.placeName);
      combobox.selectedItem = null;  
    }
    else if(this._isComboboxPlaceSelected(combobox)) {
      this._dispatchEvent('location-selector.location-changed', combobox.selectedItem);
    } 
    else if(this._isComboboxDismiss(combobox)) { 
      combobox.selectedItem = this._previousPlace || this._defaultPlace;
    }
  }

  _isComboboxOpen(customEvent) {
    return customEvent.detail && customEvent.detail.value;
  }

  _isComboboxPlaceSelected(combobox) {
    return combobox && combobox.selectedItem;
  }

  /* return if user closes the city selection modal without any selections */
  _isComboboxDismiss(combobox) {
    return combobox && !combobox.selectedItem;
  }

  _placeList(){
    const previousLocations = this._getFromLocalStorage('place');
    const allLocations = previousLocations.concat(CITIES);
    
    return allLocations;
  }


  /**
   * @return whether response API is supported
   */

  _responseApi() {
    return  navigator.permissions;
  }


  /**
   * @return whether location is already allowed and can be used without 
   * showing pop up to user
   */

  _locationAlreadyAllowed() {
    return new Promise(function(resolve, reject){
      if(!this._responseApi()) {
        reject;
      }
      else {
        navigator.permissions.query({name:'geolocation'})
          .then(permission => 
            permission.state === "granted" ? resolve : reject
          );
      }

    });
  }

  _getUrlParams(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) { 
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  _changeUrl(paramName, paramValue) {
    history.replaceState(null, null, "?" + paramName + '=' + paramValue);
  }

  _dispatchEvent(name, payload) {
    const event = new CustomEvent(name, {detail: payload, bubbles: true, composed: true});
    this.dispatchEvent(event);
  }

  _formPlaceObject(city, coordinates) {
    return {city: city, coordinates: coordinates};
  }

  _store(key, city, coordinates) {
    const newPlace = [this._formPlaceObject(city, coordinates)];
    const previousPlaces = this._getFromLocalStorage('place');

    const filtered10 = newPlace.concat(previousPlaces.filter(item => item.city !== city).slice(0, 9));
    this._storeIntoLocalStorage(key, filtered10);
  }

  _storeIntoLocalStorage(key, valueObject){
    localStorage.setItem(key, JSON.stringify(valueObject));
  }
  _getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
    
}

window.customElements.define(LocationSelector.is, LocationSelector);
