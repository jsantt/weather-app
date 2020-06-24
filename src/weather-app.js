import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

// lazy-resources are loaded in the app code
import './lazy-resources.js';

import './header/location-selector.js';

import './error-notification.js';
import './header/forecast-header';
import './main/weather-days.js';
import './forecast-data.js';

import './footer/add-to-homescreen.js';
import './footer/geolocate-button.js';
import './footer/sunrise-sunset.js';
import './footer/public-holidays.js';
import './footer/weather-footer.js';

class WeatherApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        div[hidden] {
          visibility: hidden;
        }

        .locate-button-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
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
        forecast-data="{{_forecastData}}"
        forecast-place="{{forecastPlace}}"
        loading="{{_loading}}"
        weather-location="[[_weatherLocation]]"
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
        <div hidden$="[[_firstLoading]]">
          <add-to-homescreen></add-to-homescreen>
          <slot id="place"></slot>
          <forecast-header
            feels-like="[[_currentFeelsLike]]"
            loading="[[_loading]]"
            place="[[forecastPlace]]"
            symbol="[[_currentSymbol]]"
            temperature="[[_currentTemperature]]"
            wind="[[_currentWind]]"
            wind-direction="[[_currentWindDirection]]"
            wind-gust="[[_currentWindGust]]"
          >
          </forecast-header>

          <!-- today, tomorrow and a day after tomorrow -->
          <slot id="header"></slot>

          <main>
            <weather-days
              forecast-data="[[_forecastData]]"
              show-feels-like="[[_showFeelsLike]]"
              show-wind="[[_showWind]]"
            >
            </weather-days>
          </main>

          <!-- footer -->
          <weather-footer observation-data="[[observationData]]">
            <weather-station
              slot="observations"
              observation-data="{{observationData}}"
              observation-error="{{observationError}}"
            >
            </weather-station>

            <sunrise-sunset
              slot="sunrise-sunset"
              coordinates="[[_weatherLocation.coordinates]]"
            ></sunrise-sunset>
            <public-holidays slot="public-holidays"></public-holidays>
          </weather-footer>

          <style></style>
          <div class="locate-button-container">
            <geolocate-button loading="[[_loading]]"></geolocate-button>
          </div>
        </div>
      </template>
    `;
  }

  static get is() {
    return 'weather-app';
  }

  static get properties() {
    return {
      _firstLoading: {
        type: Boolean,
        value: true,
      },
      _forecastData: {
        type: Object,
      },
      _showFeelsLike: {
        type: Boolean,
        value: false,
      },
      _showWind: {
        type: Boolean,
        value: false,
      },
      _currentFeelsLike: {
        type: Number,
      },
      _currentPlace: {
        type: Object,
      },
      _currentSymbol: {
        type: Number,
      },
      _currentTemperature: {
        type: Number,
      },
      _currentWind: {
        type: Number,
      },
      _currentWindDirection: {
        type: Number,
      },
      _currentWindGust: {
        type: Number,
      },
      _weatherLocation: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    this.addEventListener('location-selector.location-changed', (event) =>
      this._onNewLocation(event)
    );
    this.addEventListener('forecast-header.toggle-wind', (event) =>
      this._toggleWind(event)
    );

    this.addEventListener('forecast-header.toggle-feels-like', (event) =>
      this._toggleFeelsLike(event)
    );

    this.addEventListener('forecast-data.fetch-done', (event) => {
      this._firstLoading = false;
    });

    this.addEventListener('forecast-data.fetch-done', (event) => {
      this._firstLoading = false;

      const weatherNowData = this._getWeatherNow(this._forecastData);

      this._currentFeelsLike = weatherNowData.feelsLike;
      this._currentSymbol = weatherNowData.symbol;
      this._currentTemperature = weatherNowData.temperature;

      this._currentWind = weatherNowData.wind;
      this._currentWindDirection = weatherNowData.windDirection;
      this._currentWindGust = weatherNowData.windGust;
    });
  }

  ready() {
    super.ready();
    // hide possible add to homescreen button
    setTimeout(() => {
      this.shadowRoot
        .querySelector('forecast-header')
        .scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  }

  connectedCallback() {
    super.connectedCallback();

    this._loadLazyResources();
  }

  _onNewLocation(event) {
    this._weatherLocation = event.detail;
  }

  /**
   * Lazy loading don't show stack trace from failing resource.
   * Comment this lazy import out and import in regular way to see the stack trace
   */
  _loadLazyResources() {
    afterNextRender(this, () => {
      //import('./lazy-resources.js')
      //.then(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js', { scope: '/' });
      }
      /*})
        .catch(error => {
          console.log('error loading lazy resources: ' + error);
        });*/
    });
  }

  _getWeatherNow(data) {
    if (data === undefined) {
      return {};
    }

    const time = this._nextIsoHour();

    if (data === undefined) {
      return {};
    }

    const hourForecast = data.filter(function (item) {
      return item.time === time;
    })[0];

    return hourForecast;
  }

  _nextIsoHour() {
    let timeNow = new Date();

    timeNow.setHours(timeNow.getHours() + 1);
    timeNow.setMinutes(0, 0, 0);

    return timeNow.toISOString().split('.')[0] + 'Z';
  }

  _toggleWind() {
    this._showWind = !this._showWind;
  }

  _toggleFeelsLike() {
    this._showFeelsLike = !this._showFeelsLike;
  }

  _showError(event) {
    this.$.locateError.show({ text: event.detail.text });
  }
}

window.customElements.define(WeatherApp.is, WeatherApp);
