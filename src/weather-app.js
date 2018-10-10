import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'

// lazy-resources are loaded in the app code
//import './lazy-resources.js' 

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
        --padding-header-footer: 1.2rem;

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
        place="[[place]]">
      </observation-data> 
      
      <!-- rest of the data (forecast) -->
      <forecast-data 
        fetch-error="{{forecastError}}" 
        forecast-data="{{forecastData}}"
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

        <forecast-header
          loading="[[loading]]"
          next-iso-hour="[[nextIsoHour]]"
          place="[[place]]"
          forecast-data="{{forecastData}}">
        </forecast-header>
        
        <observation-modal visible="[[observationVisible]]">
            <observation-modal-content
              observation-data="{{observationData}}"
              observation-error="{{observationError}}">
            </observation-modal-content>
        </observation-modal>

        <!-- today, tomorrow and a day after tomorrow -->
        <main class$="[[_loading()]]">
          
          <weather-days 
            forecast-data="[[forecastData]]" 
            show-wind="[[showWind]]">
          </weather-days>

        </main>
    
        <!-- footer -->
        <weather-footer observation-data="[[observationData]]">
        </weather-footer>
      </template>
`;
  }

  static get is() { return 'weather-app'; }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true,
        reflectToAttribute: true,
        notify: true
      },
     
      nextIsoHour: {
        type: Number,
        computed: '_nextIsoHour()'
      },
      place: {
        type: Object,
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
    this.addEventListener('location-selector.locate-error', (event) => this._onFetchError(event));
    this.addEventListener('observation-data.fetch-error', (event) => {
      console.log('fetching observation data failed');
    });

    this.addEventListener('location-selector.locate-started', (event) => {this.loading = true;})

    this.addEventListener('forecast-data.new-place', (event) => this._onNewPlace(event));
    this.addEventListener('wind-now.toggle-wind', (event) => this._onToggleWind(event));

    this.addEventListener('forecast-header.observation-link-click', (event) => this._toggleObservationVisible());
    this.addEventListener('observation-header.forecast-link-click', (event) => this._toggleObservationVisible());
  }

  ready(){
    super.ready();
    this.removeAttribute('loading');
  }

  connectedCallback(){
    super.connectedCallback();

    this._loadLazyResources();
  }

  _debugEvent(event) {
    console.log(event.type, event.detail);
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

  _onFetchError(event) {
    this._debugEvent(event);
    this.loading = false;
  }

  _onNewLocation(event) {
    this._debugEvent(event);

    this.loading = true;
    this.weatherLocation = event.detail;
  }

  _toggleObservationVisible() {
    this.observationVisible = !this.observationVisible;
  }

  _loading() {
    return this.loading ? 'loading' : 'notloading';       
  }

  /** 
   * Lazy loading don't show stack trace from failing resource.
   * Comment this lazy import out and import in regular way to see the stack trace
   */
  _loadLazyResources() {
      import('./lazy-resources.js')
      .catch(error => {
        console.log('error loading lazy resources: ' + error);
      });
  }

  _showError(event) {
    this.$.locateError.show({text: event.detail.text});
  }

  _onNewPlace(event) {
    this._debugEvent(event);
    
    this.loading = false;
    this.place = event.detail; 
  }

  _onToggleWind(event) {
    this._debugEvent(event);
    
    this.showWind = !this.showWind;
  }
}

window.customElements.define(WeatherApp.is, WeatherApp);
