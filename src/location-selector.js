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
        
        display: block;
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
        --vaadin-text-field-default-width: 12rem;
      }

      .locate {
        margin-left: .6rem;
      }

      .locate_loadIcon {
        padding: 0 0.6rem;
      }

      .locate_icon {
        animation-name: resizeLocate;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;

        animation-iteration-count: 4;
        animation-direction: alternate;

        display: inline-block;
        padding-left: 1rem;
        transition: all .2s ease-in-out;

        vertical-align: middle;
      }

      .locate_icon:hover { 
        transform: scale(1.1);        
      }

      .locate_text {
        color: var(--color-white);
        font-size: var(--font-size-small);
      }

      @keyframes resizeLocate {
        from {
          transform: scale(1);
        }

        to {
          transform: scale(1.4);
        }
      }

      .location_name {
        display: inline-block;
      }

      .cities_locate {
        border: 1px solid black;
        padding: 0.5rem;
        border-radius: 2rem;
        width: 9.2rem;
        display: block;
      }

    </style>

    
    <div class="locate" id="locate">
        
        <template is="dom-if" if="[[loading]]">
          <paper-spinner-lite class="locate_loadIcon" active=""></paper-spinner-lite>
        </template>

        <template is="dom-if" if="[[!loading]]">
          <div 
            class="locate_icon"
            on-click="_geolocate">

            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
              <filter id="dropshadow" height="130%">

                <feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur> <!-- stdDeviation is how much to blur -->
                <feOffset dx="0" dy="1" result="offsetblur"></feOffset> <!-- how much to offset -->
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5"></feFuncA> <!-- slope is the opacity of the shadow -->
                </feComponentTransfer>
      
                <feMerge>        
                  <feMergeNode></feMergeNode> <!-- this contains the offset blurred image -->
                  <feMergeNode in="SourceGraphic"></feMergeNode> <!-- this contains the element that the filter is applied to -->
                </feMerge>
      
              </filter>

              <path style="filter:url('#dropshadow')" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
            </svg>
          </div>
        
          <vaadin-combo-box
            id="placeSelection"
            item-label-path="city"
            item-value-path="coordinates"
            on-opened-changed="_openedChanged">
           
            <template style=font-family: 'Open Sans Condensed';">
              
              <template is="dom-if" if="[[_isHighlighted(index)]]">
                <div>[[item.city]]</div>
              </template>
              <template is="dom-if" if="[[!_isHighlighted(index)]]">
                <div style="color: #916c25;">[[item.city]]</div>
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
      headerSuffix: {
        type: String
      },
      loading: {
        type: Boolean
      },
      placeName: {
        type: String,
        computed: '_getPlace(place)',
        observer: '_newPlace',
        reflectToAttribute: true
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

    this._dispatchEvent('location-selector.location-changed', currentPlace);
  }

  _newPlace(){
    let combobox = this.shadowRoot.querySelector('#placeSelection');
    
    if(combobox) {
      combobox.selectedItem = this._formPlaceObject(this.placeName);

      const url = this.placeName;
      
      this._changeUrl('place', url);
      this._store('place', this.placeName);

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
    
    let combobox = this.shadowRoot.querySelector('#placeSelection');

    if(this._isComboboxOpen(customEvent)) {

      this._previousPlace = this._formPlaceObject(this.placeName);//combobox.selectedItem;
      combobox.selectedItem = null;  
    }
    else if (this._isComboboxLocate(combobox)) {
      this._geolocate();
    }
    else if(this._isComboboxPlaceSelected(combobox)) {
      this._dispatchEvent('location-selector.location-changed', combobox.selectedItem);
    } 
    else if(this._isComboboxDismiss(combobox)) { 
      let storedCoordinates = localStorage.getItem('place');
      combobox.selectedItem = this._previousPlace || this._defaultPlace;
    }
  }

  _isComboboxOpen(customEvent) {
    return customEvent.detail && customEvent.detail.value;
  }
  _isComboboxPlaceSelected(combobox) {
    return combobox && combobox.selectedItem;
  }
  _isComboboxLocate(combobox) {
    return combobox && combobox.selectedItem && combobox.selectedItem.city === 'locate';
  }
  /* return if user closes the city selection modal without any selections */
  _isComboboxDismiss(combobox) {
    return combobox && !combobox.selectedItem;
  }

  _placeList(){
    const previousLocations = this._getFromLocalStorage('place');
    let allLocations = previousLocations.concat(CITIES);
    
    //const locate = [{city:'locate'}];
    return allLocations;
  }

  _isLocate(element) {
    return element.city === 'locate';
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

  _getPlace(placeName) {
    
    if(placeName && placeName.location){
      return placeName.location.name;
    }

    return '';
  }

  _geolocate() {

    this._dispatchEvent('location-selector.locate-started');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
      
            const coordinates = position.coords.latitude + ',' + position.coords.longitude;
            const url = position.coords.latitude + '-' + position.coords.longitude;

            this._dispatchEvent('location-selector.location-changed', this._formPlaceObject(null, coordinates));

          }, error => {
            this._dispatchEvent('location-selector.locate-error', {text: 'salli paikannus nähdäksesi paikkakuntasi sää'});
          });
    } 
    else { 
      this._dispatchEvent('location-selector.locate-error', {text: 'paikantaminen epäonnistui, yritä uudelleen'});
    }
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
