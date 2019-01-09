import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '../error-notification';
import './weather-symbol-wawa.js';

class ObservationModalContent extends PolymerElement {
  static get template() {
    return html`
    <style>

      .header {
        background-color: var(--color-primary);
        border-bottom: 0.2rem solid var(--color-gray--light); 

        grid-column: span 2;
        padding: 1.5rem 1rem;
        text-align: center;
      }

      h1, h2, h3 { 
        color: var(--color-black);
        font-weight: 500;
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
        font-size: var(--font-size-small);
        line-height: 1.5;
      }

      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        
        align-items: center;
        justify-items: center;

        padding-top: 1.4rem;
        text-align: center;
      }
      .item {
        padding: 1rem 0;
      }

      .temperature {
        justify-self: stretch;
        /*border-bottom: 1px solid var(--color-gray--light);*/
        font-size: var(--font-size-xxlarge);
        grid-column: 1 / span 2;

        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
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

      .description {
        font-size: var(--font-size-medium);
        padding: 0 1rem;
      }

      .footer {
        background-color: var(--color-primary);
        border-top: 0.2rem solid var(--color-gray--light); 
        height: 2rem;

        margin-top: 1rem;
      }
  
    </style>
  
      <div class="header">
        <h1>LÄHIN HAVAINTOASEMA</h1>
        <h2>[[observationData.weatherStation]]</h2>
        <h3>Kello [[_formatTime(observationData.time)]]</h3>
      </div>

      <template is="dom-if" if="{{observationError}}">
        <error-notification
          error-text="Sääasemalle ei valitettavasti saatu yhteyttä">
        </error-notification>
      </template>

      <template is="dom-if" if="{{!observationError}}">
        <div class="content">

          <div class="item temperature">
            <template is="dom-if" if="[[observationData.temperature]]">
              <div>
                <span>[[observationData.temperature]]°C</span> 
              </div>
            </template>
          
            <weather-symbol-wawa 
              class="value description"
              wawa-id="[[observationData.weatherCode]]"
              cloudiness="[[observationData.cloudiness]]">
            </weather-symbol-wawa>
            
          </div>
            
          <template is="dom-if" if="[[observationData.rainExplanation]]">  
            <div class="item">
              <div class="value">[[observationData.rainExplanation]]mm/h</div>
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
            <div class="item">
              <wind-icon 
                degrees="[[observationData.windDirection]]" 
                large
                wind-speed="[[observationData.wind]]">
              </wind-icon>
              <div class="explanation windExplanation">10 min keskituuli</div>
            </div>
          </template>
        
          <template is="dom-if" if="[[observationData.windGust]]">
            <div class="item">
              <div class="value">[[observationData.windGust]] m/s</div>
              <div class="explanation windExplanation">tuuli puuskissa (10 min)</div>
            </div>
          </template>
        
          <template is="dom-if" if="[[observationData.humidity]]">
            <div class="item">
              <div class="value">[[observationData.humidity]]%</div>
              <div class="explanation">ilmankosteus</div>
            </div>
          </template>
        
          <template is="dom-if" if="[[observationData.pressure]]">
            <div class="item">
              <div class="value">[[observationData.pressure]] hPa</div>
              <div class="explanation">ilmanpaine</div>
            </div>
          </template>

          <template is="dom-if" if="[[observationData.visibility]]">
            <div class="item">
              <div class="value">[[observationData.visibility]]m</div>
              <div class="explanation">näkyvyys</div>
            </div>
          </template>

          <template is="dom-if" if="[[observationData.dewPoint]]">
            <div class="item">
              <div class="value">[[observationData.dewPoint]]°C</div>
              <div class="explanation">kastepiste</div>
            </div>
          </template>

          <template is="dom-if" if="[[observationData.cloudiness]]">
            <div class="item">
              <div class="value">[[observationData.cloudiness]] / 8</div>
              <div class="explanation">pilvisyys</div>
            </div>
          </template>

          <template is="dom-if" if="[[_snow(observationData.snow)]]">
            <div class="item">
              Lumen syvyys: [[observationData.snow]] cm
            </div>
          </template>
      </div>
    </template>
    <div class="footer">
      
    </div>
    `;
  }

  static get is() { return 'observation-modal-content'; }

  static get properties() {
    return {
      observationData: {
        type: Object
      },
      observationError: {
        type: Boolean
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
