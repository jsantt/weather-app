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
        align-self: flex-end;
        display: flex;
        align-items: center;
        flex: 0 0 3rem;
        color: var(--color-white);

        text-decoration: underline;
        line-height: 1;
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

      .location {
        color: var(--color-black);
        font-size: 1.563rem;
        
        margin: 0 0 0.2rem 0;
	    	text-align: center;
      }

    </style>
      [[forecast]]
    <header hidden$=[[hidden]]>

        <div class="header-content">

          <!-- observation link -->
    
          <a 
            class="observation_link"
            on-click="_observationLinkClicked">
            
              lähin<br>
              havainto
          </a>
  
          <div>
            <h1>
              <location-selector 
                header-suffix="nyt" 
                loading="[[loading]]" 
                place="[[place]]">
              </location-selector>
            </h1>
            
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
