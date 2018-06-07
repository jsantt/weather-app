import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'
import '@polymer/paper-toast/paper-toast.js';

import './location-selector.js';
import './observation-data.js';
import './time-now.js';

import './weather-analytics.js';
import './forecast-data.js';
import './weather-days.js';

import './weather-footer.js';
import './weather-icons.js';
import './weather-notification.js';

import './weather-symbol-icons.js';
import './weather-now.js';
import './wind-now.js';


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
      }

      header {
        background-color: var(--color-primary);
        padding: 1rem 1rem 0 1rem;
      }

      .empty {
        flex: 0 0 3rem;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3rem;
      }

      .loading {
        opacity: 0.5;
      }
    
      h1 {
        margin: 0;
        
        font-size: 1.953rem;
        font-weight: inherit;
        
        padding: 0;
          
      }

      h2 {
        color: var(--color-white);
        font-size: 1.25rem;
        font-weight: 300;

        position: absolute;
        right: 1rem;
        top: -0.65rem;
      }
      
    </style>
    
      <weather-analytics key="UA-114081578-1"></weather-analytics>

      <weather-notification forecast-data="[[forecastData]]">
      </weather-notification>

      <!-- weather now data (observation) -->
      <observation-data observation-data="{{observationData}}" place="[[place]]">
      </observation-data> 


      
      <!-- rest of the data (forecast) -->
      <forecast-data weather-location="[[weatherLocation]]" forecast-data="{{forecastData}}" weather-now-data="{{weatherNowData}}">
      </forecast-data>

      <!-- 'Espoo' (or any other city) now-->
      <paper-toast id="locateError" duration="5000">
      </paper-toast>
      
      <header>
        <div class="header-content">
          <div class="empty"></div>
          
          <div>
            <h1>
              <location-selector loading="[[loading]]" place="[[place]]">
              </location-selector>
            </h1>
            
            <weather-now observation-data="[[observationData]]" weather-now-data="[[weatherNowData]]">
            </weather-now>

          </div>
          
          <wind-now class="wind" observation-data="[[observationData]]" weather-now-data="[[weatherNowData]]">
          </wind-now>

        </div>
          
        <time-now update-time="[[locationChanged]]"></time-now>

      </header>

      <!-- today, tomorrow and a day after tomorrow -->
      <main class\$="[[_loading()]]">
        <weather-days forecast-data="[[forecastData]]" show-wind="[[showWind]]"></weather-days>
      </main>

      <!-- footer -->
      <weather-footer observation-data="[[observationData]]">
      </weather-footer>
`;
  }

  static get is() { return 'weather-app'; }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      locationChanged: {
        type: String,
      },
      place: {
        type: Object,
      },
      showWind: {
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
    
    this.addEventListener('location-selector.new-location', (event) => this._onNewLocation(event));
    
    this.addEventListener('forecast-data.fetch-error', (event) => this._onFetchError(event));
    this.addEventListener('location-selector.locate-error', (event) => this._onFetchError(event));
    this.addEventListener('observation-data.fetch-error', (event) => this._onFetchError(event));

    this.addEventListener('location-selector.locate-started', (event) => {this.loading = true;})

    this.addEventListener('forecast-data.new-place', (event) => this._onNewPlace(event));
    this.addEventListener('wind-now.toggle-wind', (event) => this._onToggleWind(event));
    
  }

  _debugEvent(event) {
    console.log(event.type);
    console.log(event.detail);
  }

  _onFetchError(event) {
    this._debugEvent(event);

    this.loading = false;
    this._showError(event);
  }

  _onNewLocation(event) {
    this._debugEvent(event);

    this.loading = true;
    this.weatherLocation = event.detail;
    this.locationChanged = !this.locationChanged;
  }

  _loading() {
    return this.loading ? 'loading' : 'notloading';       
  }

  _showError(event) {
    this.$.locateError.show({text: event.detail.text});
  }

  _onNewPlace(event) {
    this._debugEvent(event);
    
    this.loading = false;
    this.place = event.detail;
    this.locationChanged = !this.locationChanged; 
  }

  _onToggleWind(event) {
    this._debugEvent(event);
    
    this.showWind = !this.showWind;
  }
}

window.customElements.define(WeatherApp.is, WeatherApp);
