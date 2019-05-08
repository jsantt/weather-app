import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';


class WeatherSymbol extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-block;
      }

      .symbol {
        --iron-icon-height: 45px;
        --iron-icon-width: 45px;
        z-index:20;
      }

      .symbol--large {
        --iron-icon-height: 80px;
        --iron-icon-width: 80px;
      }
    </style>
  
  <iron-icon icon\$="[[_iconName(symbolId)]]" class="symbol" class\$="[[_symbolSize(large)]]"></iron-icon>
`;
  }

  static get is() { return 'weather-symbol'; }

  static get properties() {
    return {
      symbolId: {
        type: Number
      },
      large: {
        type: Boolean
      }
    };
  }
  _iconName(id) {
    return 'weather-symbol-icons:weatherSymbol' + id;
  }

  _symbolSize(large) {
    return large ? 'symbol--large' : '';
  }
}

window.customElements.define(WeatherSymbol.is, WeatherSymbol);
