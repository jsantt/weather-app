import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './weather-symbol.js';
import './weather-symbol-name.js';
import './wind-icon.js';

class WeatherNow extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      .weatherNow {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: -0.3rem 0 -0.5rem 0;
      }

      .temperature {
        font-size: var(--font-size-xxxlarge);
      }

      .degree {
        font-size: var(--font-size-large);
        vertical-align: top;
      }

      .symbolText {
        color: var(--color-black);
        font-size: var(--font-size-medium);
        text-align: center;
      }

    </style>

    <section class="weatherNow">
      <div class="temperature">
        [[_round(observationData.temperature)]]
        <span class="degree">°C</span>
      </div>
      <div class="symbol">
        <weather-symbol symbol-id="[[symbolId]]" large="true"></weather-symbol>
      </div>

    </section>
    <div class="symbolText">
      <weather-symbol-name symbol-id="[[symbolId]]"></weather-symbol-name>
    </div>
`;
  }

  static get is() { return 'weather-now'; }

  static get properties() {
    return {
      observationData: {
        type: Object
      },
      symbolId: {
        type: Number,
        computed: '_symbolId(weatherNowData)'
      },
      weatherNowData: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _round(temperature) {
    return Math.round(temperature * 10) / 10;
  }

  _symbolId(weatherNowData) {
    return weatherNowData.symbol;
  }
}

window.customElements.define(WeatherNow.is, WeatherNow);
