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
import './footer/bottom-menu.js';
import './footer/geolocate-button.js';
import './footer/sunrise-sunset.js';
import './footer/public-holidays.js';
import './footer/weather-footer.js';

import '../node_modules/interactjs/dist/interact.min.js';

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
          <add-to-homescreen></add-to-homescreen>
          <slot id="place"></slot>
          <forecast-header
            loading="[[loading]]"
            place="[[forecastPlace]]"
            forecast-data="{{forecastData}}"
          >
          </forecast-header>

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
            <weather-station
              slot="observations"
              observation-data="{{observationData}}"
              observation-error="{{observationError}}"
            >
            </weather-station>

            <sunrise-sunset
              slot="sunrise-sunset"
              coordinates="[[weatherLocation.coordinates]]"
            ></sunrise-sunset>
            <public-holidays slot="public-holidays"></public-holidays>
          </weather-footer>

          <style></style>
          <div class="locate-button-container">
            <geolocate-button hide="[[loading]]"> </geolocate-button>
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
      firstLoading: {
        type: Boolean,
        value: true,
      },
      showFeelsLike: {
        type: Boolean,
        value: false,
      },
      showWind: {
        type: Boolean,
        value: false,
      },
      showWindGust: {
        type: Boolean,
        value: false,
      },
      observationVisible: {
        type: Boolean,
        value: false,
      },
      weatherLocation: {
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
    this.addEventListener('forecast-header.toggle-wind-gust', (event) =>
      this._toggleWindGust(event)
    );
    this.addEventListener('forecast-header.toggle-feels-like', (event) =>
      this._toggleFeelsLike(event)
    );

    this.addEventListener('forecast-data.fetch-done', (event) => {
      this.firstLoading = false;
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

    // TODO: Switch using Dragula or other lightweight option
    setTimeout(() => {
      interact('geolocate-button').draggable({
        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,

          // call this function on every dragend event
          end(event) {
            var textEl = event.target.querySelector('p');

            textEl &&
              (textEl.textContent =
                'moved a distance of ' +
                Math.sqrt(
                  (Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2)) |
                    0
                ).toFixed(2) +
                'px');
          },
        },
      });
    }, 1000);

    function dragMoveListener(event) {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
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
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js', { scope: '/' });
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
}

window.customElements.define(WeatherApp.is, WeatherApp);
