import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ForecastHeader extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      header {
        background-color: var(--color-primary);
        padding: 1rem 1rem 0 1rem;
      }

      .observation_link {
        color: var(--color-white);
        text-decoration: underline;
        line-height: 1;
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
      [[forecast]]
    <header hidden$=[[hidden]]>

      <h1>
        <location-selector 
          header-suffix="nyt" 
          loading="[[loading]]" 
          place="[[place]]">
        </location-selector>
      </h1>
        
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
              symbol-id="[[weatherData.symbol]]"
              temperature="[[weatherData.temperature]]">
            </weather-now>
          </div>
        
          <wind-now 
            class="wind" 
            wind="[[weatherData.wind]]"
            wind-direction="[[weatherData.windDirection]]">
          </wind-now>
      
        </div>

        <time-now update-time="[[locationChanged]]"></time-now>

        </header>
    `;
  }

  static get is() { return 'forecast-header'; }

  static get properties() {
    return {
      hidden: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      weatherData: {
        type: Object
      },
      place: {
        type: String
      }

    };
  }

  ready() {
    super.ready();
  }

  _observationLinkClicked() {
    const event = new CustomEvent('forecast-header.observation-link-click', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }
}

window.customElements.define(ForecastHeader.is, ForecastHeader);
