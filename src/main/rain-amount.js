import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class RainAmount extends PolymerElement {
  static get template() {
    return html`

      <template is="dom-if" if="{{_hasRain(rainAmount)}}">
        <style>    
        </style>
        <svg
            class="wind-icon"
            width="12" 
            height="12" 
            viewBox="0 0 32 32">
        <g>
        <path stroke="null" d="m24.66391,21.25916c0,4.95892 -4.01471,8.97363 -8.97735,8.97363c-4.9552,0 -8.97735,-4.01471 -8.97735,-8.97363s9.65762,-19.54571 9.65762,-19.47136c0.00372,0.1078 8.29708,14.51245 8.29708,19.47136z" fill="#0060e8"/>
        </g>
        </svg> [[rainAmount]]mm
      </template>
    `;
  }

  static get is() { return 'rain-amount'; }

  static get properties() {
    return {
      rainAmount: {
        type: String
      }
    };
  }

  _hasRain(rainAmount) {
    return rainAmount !== "";
  }
}

window.customElements.define(RainAmount.is, RainAmount);
