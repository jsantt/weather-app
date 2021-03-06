import { css, html, LitElement } from 'lit-element';

import './common/all-icons.js';

// no lazy loading at the moment, consider taking into use
import './common/lazy-resources.js';

import './forecast/location-selector.js';

import './common/error-notification.js';
import './forecast/forecast-header';
import './forecast/weather-days.js';
import './forecast-data.js';

import './other/add-to-homescreen.js';
import './other/geolocate-button.js';
import './other/sunrise-sunset.js';
import './other/public-holidays.js';

import './other/external-links.js';
import './other/footer-section.js';
import './other/share-app.js';

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

      p {
        margin: 0;
      }

      .container {
        max-width: 49.5rem;
        margin: 0 auto 5rem auto;
        /* padding to fix a bug. 1px padding corrects space color */
        padding-top: 1px;
      }

      .section {
        margin: var(--space-m);
      }

      .provider {
        font-weight: var(--font-weight-bold);
        border-radius: 0;
        text-align: center;
      }

      .section--sun,
      .section--calendar,
      .section--informationOnService,
      .section--feedback,
      .section--cookies,
      .section--observations {
        background-color: var(--color-white);
        color: var(--color-blue-700);
      }

      .section--forecast,
      .section--links {
        background: var(--color-gray-300);
      }

      @media only screen and (min-width: 33rem) {
        .section {
          max-width: 30rem;
          margin-left: auto;
          margin-right: auto;
        }
      }

      @media only screen and (min-width: 48rem) {
        .container {
          display: grid;
          grid-gap: var(--space-l);

          /* golden ratio */
          grid-template-columns: 500fr 500fr 618fr;
          grid-auto-rows: minmax(10px, auto);

          grid-template-areas:
            'install  install   install'
            'forecast forecast  sun'
            'forecast forecast  observations'
            'forecast forecast  feedback'
            'calendar calendar  info'
            'calendar calendar  links'
            'calendar calendar  cookies'
            'copy     copy      copy';

          margin-top: var(--space-l);
        }
        .section {
          margin: 0;
          max-width: none;
        }

        .section--install {
          grid-area: install;
        }

        .section--forecast {
          grid-area: forecast;
        }

        .section--observations {
          grid-area: observations;
        }

        .section--links {
          grid-area: links;
        }

        .section--sun {
          grid-area: sun;
        }

        .section--calendar {
          grid-area: calendar;
        }

        .section--informationOnService {
          grid-area: info;
        }

        .section--copyright {
          grid-area: copy;
        }

        .section--feedback {
          grid-area: feedback;
        }

        .section--cookies {
          grid-area: cookies;
        }
      }

      a:link {
        color: var(--color-blue-500);
      }

      a:visited,
      a:hover {
        color: var(--color-blue-700);
      }

      .logo {
        margin-top: var(--space-s);
      }

      svg {
        fill: var(--color-blue-700);
        margin-right: var(--space-s);
      }

      .info-icon {
        float: left;
        margin: var(--space-m) var(--space-m) var(--space-s) var(--space-m);
      }

      .section--copyright {
        text-align: center;
      }

      .locate-button-container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
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
            <div class="container" ?hidden="${this._firstLoading}">
              <add-to-homescreen
                class="section section--install"
              ></add-to-homescreen>
              <main class="section section--forecast">
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

                <weather-days
                  .forecastData="${this._forecastData}"
                  ?showFeelsLike="${this._showFeelsLike}"
                  ?showWind="${this._showWind}"
                >
                </weather-days>
                <footer-section class="provider">
                  <div>
                    <p>
                      Sääennuste by Ilmatieteen laitos | avoin data
                    </p>
                    <img
                      class="logo"
                      alt="fmi logo"
                      src="../image/FMI0DATA_small.png"
                    />
                  </div>
                  <div slot="footer-left"></div>
                  <div slot="footer-right">
                    <iron-icon icon="all-icons:longTimeWeather"></iron-icon>

                    <a href="https://www.ilmatieteenlaitos.fi/paikallissaa"
                      >10&nbsp;vrk&nbsp;sää</a
                    >
                  </div>
                </footer-section>
              </main>

              <weather-station
                class="section section--observations"
                .observationData="${this._observationData}"
                ?observationError="${this._observationError}"
              >
              </weather-station>

              <external-links class="section section--links"></external-links>

              <sunrise-sunset
                class="section section--sun"
                .coordinates="${this._coordinates}"
              ></sunrise-sunset>

              <public-holidays
                class="section section--calendar"
              ></public-holidays>

              <footer-section
                class="section section--informationOnService"
                header="Tietoja palvelusta"
              >
                <iron-icon class="info-icon" icon="all-icons:info"></iron-icon>

                Saaennuste.fi on nopein ja paras sääsovellus. Löydät Helsingin,
                Espoon ja muiden kaupunkien lisäksi myös tarkan täsmäsään 2.5km
                alueelle. Ennuste perustuu luotettavaan ja tarkkaan Ilmatieteen
                laitoksen
                <a
                  href="http://ilmatieteenlaitos.fi/tutkimustoiminta/-/asset_publisher/Dz9C/content/uusin-versio-harmonie-arome-saamallista-parantaa-pilvisyyden-ja-tuulen-ennusteita?redirect=http%3A%2F%2Filmatieteenlaitos.fi%2Ftutkimustoiminta%3Fp_p_id%3D101_INSTANCE_Dz9C%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2"
                >
                  Harmonie-malliin</a
                >.
              </footer-section>

              <footer-section
                class="section section--feedback"
                header="Palaute"
              >
                Puuttuuko sääpalvelusta jokin ominaisuus tai onko sinulla idea
                miten parantaisit sovellusta? Ota yhteyttä!

                <div slot="footer-left"></div>
                <div slot="footer-right">
                  <iron-icon icon="all-icons:email"></iron-icon>
                  palaute@saaennuste.fi
                </div>
              </footer-section>

              <footer-section
                class="section section--cookies"
                header="Kerätyt tiedot"
              >
                Parantaaksemme käyttökokemusta, käytämme
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=fi"
                >
                  Googlen analytiikkatyökalun</a
                >
                tarvitsemia evästeitä sivuston kävijämäärän ja käyttäytymisen
                seuraamiseen
                <div slot="footer-left"></div>
                <div slot="footer-right">
                  <iron-icon icon="all-icons:cookie"></iron-icon>
                </div>
              </footer-section>

              <footer-section class="section section--copyright">
                <iron-icon icon="all-icons:copyright"></iron-icon>
                <div>Design / toteutus Jani Säntti</div>
                <div>Säädata ja symbolit Ilmatieteen laitos</div>

                <share-app></share-app>

                <div class="locate-button-container">
                  <geolocate-button
                    ?loading="${this._loading}"
                  ></geolocate-button>
                </div>
              </footer-section>
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
    this.addEventListener('forecast-data.fetching', () => {
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
