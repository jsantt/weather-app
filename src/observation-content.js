import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ObservationContent extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: stretch;
      }

      .header {
        background-color: var(--color-secondary);
        border-bottom: 0.2rem solid var(--color-gray--light); 

        grid-column: span 2;
        padding: 1rem;
      }

      h1, h2, h3 { 
        margin: 0;
        padding: 0;
        text-align: center;
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

      .degree {
        font-size: var(--font-size-large);
        vertical-align: top;
      }

      section {
        padding: 0 1rem;
        grid-column: span 2;
      }

      .temperature {
        font-size: var(--font-size-xxlarge);
        margin: 1rem 0;
      }

      .wide {
        grid-column: span 2;
      }

      .wind {
        margin: 1rem 0;
      }

    </style>
  
      <div class="header">
        <h1>HAVAINTOASEMA <span class="beta">beta</span></h1>
        <h2>[[observationData.weatherStation]]</h2>
        <h3>Kello [[_formatTime(observationData.time)]]</h3>
      </div>
      
      <section class="temperature">
        <template is="dom-if" if="[[observationData.temperature]]">
          [[observationData.temperature]] <span class="degree">°C</span>
        </template>
      
      </section>
      <section>
        <template is="dom-if" if="[[observationData.weatherCode]]">
          [[observationData.weatherCode]]
        </template>
      </section>

      <section>
        <template is="dom-if" if="[[observationData.humidity]]">
          kosteus: [[observationData.humidity]] %
        </template>
      </section>
      <section>
        <template is="dom-if" if="[[observationData.pressure]]">
          ilmanpaine: [[observationData.pressure]] hPa
        </template>
      </section>
      <section class="wind">
        <template is="dom-if" if="[[observationData.wind]]">
          <wind-icon 
            degrees="[[observationData.windDirection]]" 
            round="" 
            wind-speed="[[observationData.wind]]">
          </wind-icon>
        </template>
      </section>
      <section>    
        <template is="dom-if" if="[[observationData.rain]]">
          Sademäärä: [[observationData.rain]]<br>
        </template>
      </section>
      <section>  
        <template is="dom-if" if="[[observationData.rainExplanation]]">  
          Sateen rankkuus: [[observationData.rainExplanation]]<br>
        </template>
      </section>
      <section>
        <template is="dom-if" if="[[_snow(observationData.snow)]]">
          Lumen syvyys: [[observationData.snow]]<br>
        </template>
      </section>
    `;
  }

  static get is() { return 'observation-content'; }

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

window.customElements.define(ObservationContent.is, ObservationContent);
