import { css, html, LitElement } from 'lit-element';

// no lazy loading at the moment, consider taking into use
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

class WeatherApp extends LitElement {
  static get is() {
    return 'weather-app';
  }

  static get styles() {
    return css`
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
    `;
  }
  render() {
    return html` <weather-analytics key="UA-114081578-1"></weather-analytics>

      <!-- Observation / weather station data -->
      <observation-data .place="${this._forecastPlace}"> </observation-data>

      <forecast-data .weatherLocation="${this._weatherLocation}">
      </forecast-data>

      <paper-toast id="locateError" duration="5000"> </paper-toast>

      ${this._forecastError === true
        ? html`
            <error-notification
              errorText="Säätietojen haku epäonnistui"
              id="errorNotification"
            >
            </error-notification>
          `
        : html`
            <div ?hidden="${this._firstLoading}">
              <add-to-homescreen></add-to-homescreen>
              <slot id="place"></slot>
              <forecast-header
                .feelsLike="${this._currentFeelsLike}"
                ?loading="${this._loading}"
                .place="${this._forecastPlace}"
                .symbol="${this._currentSymbol}"
                .temperature="${this._currentTemperature}"
                .wind="${this._currentWind}"
                .windDirection="${this._currentWindDirection}"
                .windGust="${this._currentWindGust}"
              >
              </forecast-header>

              <!-- today, tomorrow and a day after tomorrow -->
              <slot id="header"></slot>
              <main>
                <weather-days
                  .forecastData="${this._forecastData}"
                  ?showFeelsLike="${this._showFeelsLike}"
                  ?showWind="${this._showWind}"
                >
                </weather-days>
              </main>

              <!-- TODO: move weather footer things here to allow
              CSS grid placement. First, upgrade data and this class
            to lit-element  -->
              <weather-footer .observationData="${this._observationData}">
                <weather-station
                  slot="observations"
                  .observationData="${this._observationData}"
                  ?observationError="${this._observationError}"
                >
                </weather-station>

                <sunrise-sunset
                  slot="sunrise-sunset"
                  .coordinates="${this._coordinates}"
                ></sunrise-sunset>
                <public-holidays slot="public-holidays"></public-holidays>
              </weather-footer>

              <style></style>
              <div class="locate-button-container">
                <geolocate-button
                  ?loading="${this._loading}"
                ></geolocate-button>
              </div>
            </div>
          `}`;
  }

  static get properties() {
    return {
      _coordinates: {
        type: Object,
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
      _firstLoading: {
        type: Boolean,
      },
      _forecastData: {
        type: Array,
      },
      _forecastError: {
        type: Boolean,
      },
      _forecastPlace: {
        type: Object,
      },
      _loading: {
        type: Boolean,
      },
      _showFeelsLike: {
        type: Boolean,
      },
      _showWind: {
        type: Boolean,
      },
      _observationData: {
        type: Object,
      },
      _observationError: {
        type: Boolean,
      },
      _weatherLocation: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    this._firstLoading = true;
    this._forecastError = false;

    this._showWind = false;
    this._showFeelsLike = false;

    // user changes location
    this.addEventListener('location-selector.location-changed', (event) => {
      this._weatherLocation = event.detail;
      this._coordinates = this._weatherLocation.coordinates;
    });

    // forecast data
    this.addEventListener('forecast-data.fetch-done', () => {
      this._loading = true;
    });

    this.addEventListener('forecast-data.fetch-done', () => {
      this._fetchDone();
      this._loading = false;
      this._firstLoading = false;
    });

    this.addEventListener('forecast-data.new-data', (event) => {
      this._forecastError = false;
      this._forecastData = event.detail;
    });

    this.addEventListener('forecast-data.new-place', (event) => {
      this._forecastPlace = event.detail;
    });

    this.addEventListener('forecast-data.fetch-error', () => {
      this._forecastError = true;
    });

    // observation data

    this.addEventListener('observation-data.new-data', (event) => {
      this._observationError = false;
      this._observationData = event.detail;
    });

    this.addEventListener('observation-data.fetch-error', () => {
      this._observationError = true;
    });

    this.addEventListener('forecast-header.toggle-wind', () => {
      this._showWind = !this._showWind;
    });

    this.addEventListener('forecast-header.toggle-feels-like', () => {
      this._showFeelsLike = !this._showFeelsLike;
    });
  }

  firstUpdated() {
    // hide possible add to homescreen button
    setTimeout(() => {
      this.shadowRoot
        .querySelector('forecast-header')
        .scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  }

  connectedCallback() {
    super.connectedCallback();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js', { scope: '/' });
    }
  }

  _fetchDone() {
    this._firstLoading = false;

    const weatherNowData = this._getWeatherNow(this._forecastData);

    this._currentFeelsLike = weatherNowData.feelsLike;
    this._currentSymbol = weatherNowData.symbol;
    this._currentTemperature = weatherNowData.temperature;

    this._currentWind = weatherNowData.wind;
    this._currentWindDirection = weatherNowData.windDirection;
    this._currentWindGust = weatherNowData.windGust;
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

  _showError(event) {
    this.shadowRoot
      .querySelector('#locateError')
      .show({ text: event.detail.text });
  }
}

window.customElements.define(WeatherApp.is, WeatherApp);
