import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

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
      
      .citySelection {
        /* overwriting Vaadin's default styles */
        --lumo-contrast-10pct: transparent;
      }

      .locate {
        display: flex;
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

        vertical-align: middle;
        padding: 0 0.6rem;
        transition: all .2s ease-in-out;
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
        padding-right: 2rem;
      }

    </style>

    
    <div class="locate">
        
        <template is="dom-if" if="[[loading]]">
          <paper-spinner-lite class="locate_loadIcon" active=""></paper-spinner-lite>
        </template>

        <template is="dom-if" if="[[!loading]]">
          <div 
            class="locate_icon"
            on-click="_geolocate">

            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="28" height="28" viewBox="0 0 24 24">
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
            class="citySelection" 
            items="[[_cities()]]"
            value="[[placeName]]">

          </vaadin-combo-box>

        </template>
      
      <div class="location_name"><!--[[placeName]]  [[headerSuffix]] --> </div>
    </div>
`;
  }

  static get is() { return 'location-selector'; }

  static get properties() {
    return {
      defaultPlace: {
        type: String,
        value:  '60.1698557,24.9383791' // Helsinki
      },
      headerSuffix: {
        type: String
      },
      loading: {
        type: Boolean
      },
      placeName: {
        type: String,
        computed: '_getPlace(place)'
      }
    };
  }

  ready() {
    super.ready();
    
    let storedPlace = localStorage.getItem('place');

    if(!storedPlace) {
      storedPlace = this.defaultPlace;
    }
    
    this._dispatchEvent('location-selector.device-located', {latlon: storedPlace});
  }

  _cities(){
    let cities = ['Espoo','Helsinki', 'Jyväskylä', 'Saarijärvi'];
    
    cities.push(this.placeName);

    return cities;
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
      
            const latlon = position.coords.latitude + ',' + position.coords.longitude;
            const url = position.coords.latitude + '-' + position.coords.longitude;

            this._dispatchEvent('location-selector.device-located', { latlon: latlon});
            
            this._changeUrl('place', url);
            this._storeIntoLocalStorage('place', latlon);

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

  _storeIntoLocalStorage(name, value) {
    localStorage.setItem(name, value);
  }
    
}

window.customElements.define(LocationSelector.is, LocationSelector);
