import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './wind-icon.js';


class WindNow extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

    </style>

  
    <wind-icon class="windIcon" on-click="_toggleWind" degrees="[[_windDirection(observationData.windDirection)]]" large="" round="" wind-speed="[[_wind(observationData.wind)]]">
    </wind-icon>
`;
  }

  static get is() { return 'wind-now'; }

  static get properties() {
    return {
      observationData: {
        type: Object
      },
      weatherNowData: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _toggleWind() {
    var toggleWind = new CustomEvent('wind-now.toggle-wind', {bubbles: true, composed: true});
    this.dispatchEvent(toggleWind);
  }

  _wind(wind) {
    return wind;
  }

  _windDirection(windDirection) {
    return windDirection;
  }
}

window.customElements.define(WindNow.is, WindNow);
