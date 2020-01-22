import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

// lazy-resources are loaded in the app code
import "./lazy-resources.js";

import "./header/location-selector.js";

import "./error-notification.js";
import "./header/forecast-header";
import "./main/weather-days.js";
import "./forecast-data.js";

import "./footer/bottom-menu.js";
import "./footer/geolocate-button.js";
import "./footer/sunrise-sunset.js";
import "./footer/public-holidays.js";
import "./footer/weather-footer.js";

class WeatherApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          /* NEW COLORS */
          --color-gray-300: #f5f5f5;
          --color-gray-500: #ccc;
          --color-gray-600: #999;
          --color-gray-800: #545454;
          --color-gray-900: #424242;

          --color-black: #111;
          --color-white: #fff;

          --color-red-500: #ed332b;

          --color-blue-300: #219ebd;
          --color-blue-500: #20639b;
          --color-blue-800: #173f5f;

          --color-beige-500: #faebd7;
          --color-beige-900: #57360a;

          --color-green-500: #3caea3;

          --color-yellow-500: #f6d55c;
          --color-orange-500: #ffa800;

          --font-family: "Open Sans Condensed", sans-serif;
          --font-family-secondary: sans-serif;

          /* TODO: REMOVE OLD COLORS */

          --color-palette-blue: #187187;

          --color-gray--dark: #555;
          --color-gray: #999;
          --color-gray--light: #ddd;

          /* main colors */
          --color-primary: var(--color-blue-500);
          --color-secondary: var(--color-blue-800);
          --color-tertiary: var(--color-blue-800);

          --line-height--tight: 1;
          --padding-header-footer: 1rem;
          --notification-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.05);

          --border-radius: 0.75rem;
        }

        div[hidden] {
          visibility: hidden;
        }

        error-notification {
          display: flex;
          justify-content: center;

          height: 100vh;
        }
      </style>
      <weather-analytics key="UA-114081578-1"></weather-analytics>

      <!-- weather now data (observation) -->
      <observation-data
        fetch-error="{{observationError}}"
        observation-data="{{observationData}}"
        place="[[forecastPlace]]"
      >
      </observation-data>

      <!-- rest of the data (forecast) -->
      <forecast-data
        fetch-error="{{forecastError}}"
        forecast-data="{{forecastData}}"
        forecast-place="{{forecastPlace}}"
        loading="{{loading}}"
        weather-location="[[weatherLocation]]"
      >
      </forecast-data>

      <!-- 'Espoo' (or any other city) now-->
      <paper-toast id="locateError" duration="5000"> </paper-toast>

      <template is="dom-if" if="[[forecastError]]">
        <error-notification
          error-text="Säätietojen haku epäonnistui"
          id="errorNotification"
        >
        </error-notification>
      </template>

      <template is="dom-if" if="{{!forecastError}}">
        <div hidden$="[[firstLoading]]">
          <slot id="place"></slot>
          <forecast-header
            loading="[[loading]]"
            place="[[forecastPlace]]"
            forecast-data="{{forecastData}}"
          >
          </forecast-header>

          <observation-modal visible="[[observationVisible]]">
            <observation-modal-content
              observation-data="{{observationData}}"
              observation-error="{{observationError}}"
            >
            </observation-modal-content>
          </observation-modal>

          <!-- today, tomorrow and a day after tomorrow -->
          <slot id="header"></slot>

          <main>
            <weather-days
              forecast-data="[[forecastData]]"
              show-feels-like="[[showFeelsLike]]"
              show-wind="[[showWind]]"
              show-wind-gust="[[showWindGust]]"
            >
            </weather-days>
          </main>

          <!-- footer -->
          <weather-footer observation-data="[[observationData]]">
            <sunrise-sunset
              slot="sunrise-sunset"
              coordinates="[[weatherLocation.coordinates]]"
            ></sunrise-sunset>
            <public-holidays slot="public-holidays"></public-holidays>
          </weather-footer>

          <style></style>
          <bottom-menu observation-data="[[observationData]]">
            <geolocate-button hide="[[loading]]"> </geolocate-button>
          </bottom-menu>
        </div>
      </template>
    `;
  }

  static get is() {
    return "weather-app";
  }

  static get properties() {
    return {
      firstLoading: {
        type: Boolean,
        value: true
      },
      showFeelsLike: {
        type: Boolean,
        value: false
      },
      showWind: {
        type: Boolean,
        value: false
      },
      showWindGust: {
        type: Boolean,
        value: false
      },
      observationVisible: {
        type: Boolean,
        value: false
      },
      weatherLocation: {
        type: String
      }
    };
  }

  constructor() {
    super();

    this.addEventListener("location-selector.location-changed", event =>
      this._onNewLocation(event)
    );
    this.addEventListener("forecast-header.toggle-wind", event =>
      this._toggleWind(event)
    );
    this.addEventListener("forecast-header.toggle-wind-gust", event =>
      this._toggleWindGust(event)
    );
    this.addEventListener("forecast-header.toggle-feels-like", event =>
      this._toggleFeelsLike(event)
    );

    this.addEventListener("forecast-data.fetch-done", event => {
      this.firstLoading = false;
    });
    this.addEventListener("forecast-header.toggle-observation", event =>
      this._toggleObservationVisible()
    );
    this.addEventListener("observation-modal.toggle-observation", event =>
      this._toggleObservationVisible()
    );
  }

  ready() {
    super.ready();
  }

  connectedCallback() {
    super.connectedCallback();

    this._loadLazyResources();
  }

  _onNewLocation(event) {
    this.weatherLocation = event.detail;
  }

  /**
   * Lazy loading don't show stack trace from failing resource.
   * Comment this lazy import out and import in regular way to see the stack trace
   */
  _loadLazyResources() {
    afterNextRender(this, () => {
      //import('./lazy-resources.js')
      //.then(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js", { scope: "/" });
      }
      /*})
        .catch(error => {
          console.log('error loading lazy resources: ' + error);
        });*/
    });
  }

  _toggleWind() {
    this.showWind = !this.showWind;
  }

  _toggleWindGust() {
    this.showWindGust = !this.showWindGust;
  }

  _toggleFeelsLike() {
    this.showFeelsLike = !this.showFeelsLike;
  }

  _showError(event) {
    this.$.locateError.show({ text: event.detail.text });
  }

  _toggleObservationVisible() {
    const forecastHeader = this.shadowRoot.querySelector("forecast-header");
    //forecastHeader.toggleObservationHighlight();

    this.observationVisible = !this.observationVisible;
  }
}

window.customElements.define(WeatherApp.is, WeatherApp);
