import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class GeolocateButton extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-block;

        /* more space to click */ 	   
        margin: -1rem;
        padding: 1rem 0.5rem 1rem 1rem;

        vertical-align: middle;
      }

      .locate_icon {
        transition: all .2s ease-in-out;
      }

      .locate_icon:hover { 
        transform: scale(1.1);        
      }

    </style>
    <template is="dom-if" if="{{!hide}}">
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
    </template>        
  `;
  }

  static get is() { return 'geolocate-button'; }

  ready() {
    super.ready();
  }

  static get properties() {
    return {
      hide: {
        type: Boolean
      }
    }
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

  _dispatchEvent(name, payload) {
    const event = new CustomEvent(name, {detail: payload, bubbles: true, composed: true});
    this.dispatchEvent(event);
  }

  _formPlaceObject(city, coordinates) {
    return {city: city, coordinates: coordinates};
  }    
}

window.customElements.define(GeolocateButton.is, GeolocateButton);
