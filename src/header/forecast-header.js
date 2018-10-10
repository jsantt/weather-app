import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './time-now.js';

class ForecastHeader extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      
      header {
        background-color: var(--color-primary);
        min-height: 8rem;
        padding: var(--padding-header-footer) var(--padding-header-footer) 0 var(--padding-header-footer);
      }

      .observation_link {
        color: var(--color-white);
        text-decoration: underline;
        line-height: var(--line-height--tight);
      }
      .empty {
        flex: 0 0 3rem;
      }      

      .header-content {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        
        margin-bottom: 0.3rem;
      }

      .loading {
        opacity: 0.5;
      }
    
      h1 {
        margin: 0;
        
        padding: 0;
          
      }

      .location {
        color: var(--color-black);
        font-size: 1.563rem;
      }

      .wind {
        margin-bottom: -0.66rem;
      }

    </style>
    <header>
      <div class="header">
        <h1>
          <location-selector 
            header-suffix="nyt" 
            loading="[[loading]]" 
            place="[[place]]">
          </location-selector>
        </h1>
    </div>  
        <div class="header-content">

          <!-- observation link -->
    
          <a 
            class="observation_link"
            on-click="_observationLinkClicked">
            
              lähin<br>
              havainto
          </a>
  
          <div>
            <weather-now 
              symbol-id="[[selectedData.symbol]]"
              temperature="[[selectedData.temperature]]">
            </weather-now>
          </div>
        
          <wind-now 
            class="wind" 
            wind="[[selectedData.wind]]"
            wind-direction="[[selectedData.windDirection]]">
          </wind-now>
      
        </div>

        <time-now update-time="[[locationChanged]]"></time-now>
      
      </header>
    `;
  }

  static get is() { return 'forecast-header'; }

  static get properties() {
    return {
      loading: {
        type: Boolean
      },
      forecastData: {
        type: Object
      },
      nextIsoHour: {
        type: String
      },
      selectedData: {
        type: Object,
        computed: '_getWeatherNow(forecastData, nextIsoHour)'
      },
      place: {
        type: String
      }

    };
  }

  ready() {
    super.ready();
  }

  _parseHour(timestamp) {
    const date = new Date(timestamp);
    return date.getHours();
  }

  _getWeatherNow(data, time) {
    if(data) {
      return data.filter(function (item) {
        return item.time === time;
      })[0];
    }
  }

  _observationLinkClicked() {
    const event = new CustomEvent('forecast-header.observation-link-click', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }
}

window.customElements.define(ForecastHeader.is, ForecastHeader);
