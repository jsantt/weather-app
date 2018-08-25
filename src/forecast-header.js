import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ForecastHeader extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      
      .header {
        line-height: var(--line-height--tight);
        
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }
      .time {
        color: var(--color-white);
      }

      header {
        background-color: var(--color-primary);
        padding: var(--padding-header-footer);
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
        <div class="time">
          <svg style="width:12px;height:12px" viewBox="0 0 24 24">
            <path fill="#ffffff" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"></path>
          </svg>
          [[_parseHour(nextHour)]].00 <br> ennuste
        </div>
        <h1>
          <location-selector 
            header-suffix="nyt" 
            loading="[[loading]]" 
            place="[[place]]">
          </location-selector>
        </h1>
        
        <div>
        </div>
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
      nextHour: {
        type: String
      },
      selectedData: {
        type: Object,
        computed: '_getWeatherNow(forecastData, nextHour)'
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
