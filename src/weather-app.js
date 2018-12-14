import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

// lazy-resources are loaded in the app code


//import './lazy-resources.js' 

import './header/location-selector.js';

import './error-notification.js';
import './header/forecast-header';
import './main/weather-days.js';
import './footer/weather-footer.js';
import './forecast-data.js';


class WeatherApp extends PolymerElement {

  static get template() {
    return html`
    <style>

      :host {
        display: block;

        /* don't use these directly (except below) */
        --color-palette-yellow: #ffffd1;
        --color-palette-brown: #916c25;
        --color-palette-orange: #ffa800;
        --color-palette-blue: #0060e8;
        --color-palette-lightBlue: #84b9ff;

        /* pure black or white can be too hard, use these instead  */        
        --color-black: #111;
        --color-white: #fff;
        --color-gray--dark: #555;
        --color-gray: #999;
        --color-gray--light: #ddd;  
              
        /* main colors */
        --color-primary: var(--color-palette-lightBlue);
        --color-secondary: var(--color-palette-yellow);
        --color-tertiary: #ddd;

        --line-height--tight: 1;
        --padding-header-footer: 1rem;

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

      <weather-notification 
        forecast-data="[[forecastData]]">
      </weather-notification>

      <!-- weather now data (observation) -->
      <observation-data 
        fetch-error="{{observationError}}"
        observation-data="{{observationData}}"
        place="[[forecastPlace]]">
      </observation-data> 
      
      <!-- rest of the data (forecast) -->
      <forecast-data 
        fetch-error="{{forecastError}}" 
        forecast-data="{{forecastData}}"
        forecast-place="{{forecastPlace}}"
        loading="{{loading}}"
        weather-location="[[weatherLocation]]">
      </forecast-data>

      <!-- 'Espoo' (or any other city) now-->
      <paper-toast id="locateError" duration="5000">
      </paper-toast>
      
      <template is="dom-if" if="[[forecastError]]">
        <error-notification
          error-text="Säätietojen haku epäonnistui"
          id="errorNotification">
        </error-notification>
      </template>

      <template is="dom-if" if="{{!forecastError}}">

        <div hidden\$="[[firstLoading]]">
          <forecast-header
            loading="[[loading]]"
            next-iso-hour="[[nextIsoHour]]"
            place="[[forecastPlace]]"
            forecast-data="{{forecastData}}">
          </forecast-header>
          
          <observation-modal visible="[[observationVisible]]">
              <observation-modal-content
                observation-data="{{observationData}}"
                observation-error="{{observationError}}">
              </observation-modal-content>
          </observation-modal>

          <!-- today, tomorrow and a day after tomorrow -->
          <main>
            <weather-days 
              forecast-data="[[forecastData]]"
              show-feels-like="[[showFeelsLike]]" 
              show-wind="[[showWind]]">
            </weather-days>

          </main>

          <!-- footer -->
          <weather-footer observation-data="[[observationData]]">
          </weather-footer>
        
        </div>
      </template>
    `;
  }

  static get is() { return 'weather-app'; }

  static get properties() {
    return {

      firstLoading: {
        type: Boolean,
        value: true
      },

      nextIsoHour: {
        type: Number,
        computed: '_nextIsoHour()'
      },

      showFeelsLike: {
        type: Boolean,
        value: false
      },

      showWind: {
        type: Boolean,
        value: false
      },

      observationVisible: {
        type: Boolean,
        value: false
      },

      weatherLocation: {
        type: String,
      }
    }
  }

  constructor() { 
    super();
    
    this.addEventListener('location-selector.location-changed', (event) => this._onNewLocation(event));
    this.addEventListener('forecast-header.toggle-wind', (event) => this._toggleWind(event));
    this.addEventListener('forecast-header.toggle-feels-like', (event) => this._toggleFeelsLike(event));

    this.addEventListener('forecast-data.fetch-done', (event) => {this.firstLoading = false;});
    this.addEventListener('forecast-header.toggle-observation', (event) => this._toggleObservationVisible());
    this.addEventListener('observation-modal.toggle-observation', (event) => this._toggleObservationVisible());
  }

  ready(){
    super.ready();
  }

  connectedCallback(){
    super.connectedCallback();

    this._loadLazyResources();
  }

  _nextFullHour() {
    let timeNow = new Date();

    timeNow.setHours(timeNow.getHours() + 1);
    timeNow.setMinutes(0,0,0);

    let nextHour = timeNow.getHours();

    nextHour = nextHour === 0 ? 24 : nextHour;

    return nextHour;
  }
 
  _nextIsoHour() {
    let timeNow = new Date();

    timeNow.setHours(timeNow.getHours() + 1);
    timeNow.setMinutes(0,0,0);

    return timeNow.toISOString().split('.')[0]+"Z"; 
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
        import('./lazy-resources.js')
        .then(() => {
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js', {scope: '/'});
          }
        })
        .catch(error => {
          console.log('error loading lazy resources: ' + error);
        });
      });
  }

  _toggleWind(event) {
    this.showWind = !this.showWind;
  }
  _toggleFeelsLike(event) {
    this.showFeelsLike = !this.showFeelsLike;
  }

  _showError(event) {
    this.$.locateError.show({text: event.detail.text});
  }

  _toggleObservationVisible() {
    const forecastHeader = this.shadowRoot.querySelector('forecast-header');
    forecastHeader.toggleObservationHighlight();

    this.observationVisible = !this.observationVisible;
  }
}

window.customElements.define(WeatherApp.is, WeatherApp);
