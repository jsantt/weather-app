import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class GeolocateButton extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        padding: 0 1rem;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      svg {
        fill: var(--color-palette-blue);
      }
      .locate-text {
        font-size: var(--font-size-xsmall);
        padding-bottom: 0.25rem;
      }

    </style>
    <template is="dom-if" if="{{!hide}}">
      <div on-click="_geolocate">
        <svg 
          class="icon"
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24">
          
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
        </svg>
        <div class="locate-text">paikanna</div>
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

            this._dispatchEvent('location-selector.location-changed', this._formPlaceObject(coordinates));

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

  _formPlaceObject(coordinates) {
    return {city: undefined, coordinates: coordinates};
  }    
}

window.customElements.define(GeolocateButton.is, GeolocateButton);
