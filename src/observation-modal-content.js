import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './weather-symbol-wawa.js';

class ObservationModalContent extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
      
      }

      .header {
        background-color: var(--color-secondary);
        border-bottom: 0.2rem solid var(--color-gray--light); 

        grid-column: span 2;
        padding: 1rem;
        text-align: center;
      }

      h1, h2, h3 { 
        margin: 0;
        padding: 0;
      }

      h1 {
        font-size: var(--font-size-medium);
        line-height: 1;
      }

      .beta {
        font-size: var(--font-size-small);
        font-style: italic;
        vertical-align: super;
      }

      h2 {
        font-size: var(--font-size-xlarge);
        line-height: 1.1;
      }
      h3 {
        color: var(--color-gray);
        font-size: var(--font-size-small);
        line-height: 1.5;
      }

      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 7rem 6.5rem 6.5rem 5em;
        
        align-items: end;
        justify-items: center;

        text-align: center;
      }

      .temperature {
        align-self: normal;
        margin-top: 1.5rem;
        justify-self: stretch;
        border-bottom: 1px solid var(--color-gray--light);
        font-size: var(--font-size-xxxlarge);
        margin-bottom: -0.37rem;
        grid-column: 1 / span 2;
      }
      .degree {
        font-size: var(--font-size-large);
        vertical-align: super;
      }
      .textual {
        font-size: var(--font-size-medium);
      }
      .rainDetails {
        grid-column: 1 / span 2;
      }
      .value {
        font-size: var(--font-size-large);
      }
      .windExplanation {
        margin-top: -0.26rem;
      }
  
    </style>
  
      <div class="header">
        <h1>HAVAINTOASEMA <span class="beta">beta</span></h1>
        <h2>[[observationData.weatherStation]]</h2>
        <h3>Kello [[_formatTime(observationData.time)]]</h3>
      </div>
      <div class="content">
 
        <div class="temperature">
          <template is="dom-if" if="[[observationData.temperature]]">
            <span>[[observationData.temperature]]</span> <span class="degree">°C</span>
          </template>
        
          <weather-symbol-wawa 
            class="value"
            wawa-id="[[observationData.weatherCode]]">
          </weather-symbol-wawa>
          
        </div>
        

           
          <template is="dom-if" if="[[observationData.rainExplanation]]">  
            <div>
              <div class="value">[[observationData.rainExplanation]]</div>
              <div class="explanation">sateen rankkuus</div>
            <div>
          </template>
        
          <template is="dom-if" if="[[observationData.rain]]">
            <div>
              <div class="value">[[observationData.rain]]</div> 
              <div class="explanation"> mm sadetta / edeltävä tunti</div>
            </div>
          </template>
        

          <template is="dom-if" if="[[observationData.wind]]">
            <div>
              <wind-icon 
                degrees="[[observationData.windDirection]]" 
                large
                round="" 
                wind-speed="[[observationData.wind]]">
              </wind-icon>
              <div class="explanation windExplanation">10 min keskituuli</div>
            </div>
          </template>
        
        <template is="dom-if" if="[[observationData.humidity]]">
          <div>
            <div class="value">[[observationData.humidity]]%</div>
            <div class="explanation">ilmankosteus</div>
          </div>
        </template>
      
        <template is="dom-if" if="[[observationData.pressure]]">
          <div>
            <div class="value">[[observationData.pressure]] hPa</div>
            <div class="explanation">ilmanpaine</div>
          </div>
        </template>
      
        <template is="dom-if" if="[[observationData.rain]]">
          <div>
            <div>
              [[observationData.rain]] 
            </div>
            <div>
              sademäärä mm / edeltävä tunti
            </div>
          <div>
        </template>
            
        <template is="dom-if" if="[[_snow(observationData.snow)]]">
          <div>
            Lumen syvyys: [[observationData.snow]]
          </div>
        </template>
    </div>
    `;
  }

  static get is() { return 'observation-modal-content'; }

  static get properties() {
    return {
      observationData: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _formatTime(time) {
    const parsedTime = new Date(time);
    
    const minutes = parsedTime.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return  parsedTime.getHours() + '.' + fullMinutes;
  }
  _snow(centimeters) {
    return centimeters > -1;
  }
}

window.customElements.define(ObservationModalContent.is, ObservationModalContent);
