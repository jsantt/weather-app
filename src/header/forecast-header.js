import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import './geolocate-button.js';
import './time-now.js';
import '../weather-symbol.js';
import './weather-symbol-name.js';

class ForecastHeader extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;

        background-color: var(--color-primary);
      }

      .header {
        display: grid;
        grid-template-columns: 1fr 1fr 3rem;
        grid-template-rows: 1.3rem 3.5rem 3.5rem 3.5rem;
        grid-template-areas:
          'empty empty empty'    
          'place place wind'
          'temp  icon  feels'
          'text  text  obs ';

        align-items: center;

        margin-left: 2rem;
      }

      weather-symbol {
        grid-area: icon;
        margin: -1rem 0 -1.3rem 0;
      }

      .place {
        text-align: center;
      }      

      .wind {
        grid-area: wind;
        padding-top: 0.2rem;
        text-align: center;
      }
      .aside-item.selected {
        background-color: #f5f5f59e;
        border-bottom: none;
      }

      #feels_icon:hover {
        transform: scale(1.1);
      }

      .observation {
        grid-area: obs;
        text-align: center;
      }

      .aside-icon:hover {
        transform: scale(1.1);
      }
    
      h1 {
        grid-area: place;
        margin: -0.5rem 0 0 0;
        padding: 0;
      }
        
      .aside-item {
        align-self: stretch;
        background-color: #f5f5f529;

        display: flex;
        align-items: center;
        justify-content: center;

        color: var(--color-white);
        font-size: var(--font-size-xsmall);
        text-align: center;
      }

      .location {
        color: var(--color-black);
        font-size: 1.563rem;
      }

      .temperature {
        grid-area: temp;
        font-size: var(--font-size-xxxlarge);
        line-height: 1.15;
        margin: 0 0 0 auto;
      }

      .degree {
        font-size: var(--font-size-large);
        vertical-align: top;
      }

      .observation_link {
        color: var(--color-white);
        display: block;

        margin-top: auto;
        line-height: var(--line-height--tight);
      }
      .feelsLike {
        grid-area: feels;
      }

      .feelsLikeValue {
        font-size: var(--font-size-small);
        font-weight: 900;
      }

      weather-symbol-name {
        grid-area: text;
        font-size: var(--font-size-medium);
        text-align: center;
      }

    </style>
    <header>
      <div class="header">
        <h1 class="place">
          <geolocate-button 
            class="button"
            hide="[[loading]]">
          </geolocate-button>

          <location-selector 
            loading="[[loading]]" 
            place="[[place]]">
          </location-selector>
        </h1>

        <div class="temperature">
          [[_round(selectedData.temperature)]]
          <span class="degree">°C</span>
        </div>
          
        <weather-symbol 
          symbol-id="[[selectedData.symbol]]" 
          large="true">
        </weather-symbol>

        <div 
          id="wind" 
          class="wind aside-item"
          on-click="_toggleWind">

          <wind-icon 
            class="windIcon" 
            degrees="[[selectedData.windDirection]]" 
            large
            wind-gust="[[selectedData.windGust]]"
            wind-speed="[[selectedData.wind]]">
          </wind-icon>
        </div>

        <div id="feelsLike" 
          on-click="_toggleFeelsLike"
          class="feelsLike aside-item">

          <svg class="aside-icon" width="32" height="32">
            <ellipse class="head" stroke="#000" ry="7.3" rx="7.5" cy="8.2" cx="16" fill="#ffcdd2"/>
            <ellipse class= body ry="15.1" rx="14.9" cy="30.9" cx="15.9" stroke="#000" fill="#fff"/>
            <text text-anchor="middle" x="16" y="31" class="feelsLikeValue">[[selectedData.feelsLike]]</text>
          </svg>
        </div>

        <weather-symbol-name
          symbol-id="[[selectedData.symbol]]">
        </weather-symbol-name>
        
        <div
          id="observation"
          class="observation aside-item"
          on-click="_toggleObservation">
          
          <svg
            class="aside-icon"
            width="36px"
            height="36px"
            viewBox="0 0 32 32">

            <path stroke="#000" stroke-width="1" fill="#fff" d="m19.27125,18.08333l0,-13.16322c0,-1.70222 -1.38385,-3.08056 -3.08423,-3.08056c-1.70406,0 -3.0824,1.37834 -3.0824,3.08056l0,13.05924c-1.93777,1.06182 -3.25354,3.12013 -3.25354,5.48483c0,3.45229 2.799,6.25037 6.25037,6.25037c3.4532,0 6.25036,-2.79808 6.25036,-6.25037c0.00092,-2.29385 -1.23848,-4.29511 -3.08056,-5.38085z"/>
            <rect stroke="#000" stroke-width="1" fill="#ffcdd2" height="11.5625" width="1.4375" y="8.559082" x="15.46875" />
            <ellipse stroke="#000" stroke-width="1" fill="#ffcdd2" ry="3.53125" rx="3.53125" id="svg_7" cy="23.402832" cx="16.0625"/>
          
          </svg>
        </div>
      
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
        type: Object
      }

    };
  }

  constructor()  {
    super();
  }

  ready() {
    super.ready();
  }

  toggleObservationHighlight() {
    this.shadowRoot.querySelector("#observation").classList.toggle("selected");
  }

  _getWeatherNow(data, time) {
    if(data) {
      return data.filter(function (item) {
        return item.time === time;
      })[0];
    }
  }

  _toggleObservation() {
    const event = new CustomEvent('forecast-header.toggle-observation', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }

  _toggleFeelsLike() {
    this.shadowRoot.querySelector("#feelsLike").classList.toggle("selected");

    var toggleFeelsLike = new CustomEvent('forecast-header.toggle-feels-like', {bubbles: true, composed: true});
    this.dispatchEvent(toggleFeelsLike);

    this._deselectWind();
  }

  _toggleWind() {
    this.shadowRoot.querySelector("#wind").classList.toggle("selected");

    var toggleWind = new CustomEvent('forecast-header.toggle-wind', {bubbles: true, composed: true});
    this.dispatchEvent(toggleWind);

    this._deselectFeelsLike();
  }

  _deselectWind() {
    const windSelected = this.shadowRoot.querySelector("#wind").classList.contains("selected");

    if(windSelected){
      this.shadowRoot.querySelector("#wind").classList.remove("selected");
      var toggleWind = new CustomEvent('forecast-header.toggle-wind', {bubbles: true, composed: true});
    this.dispatchEvent(toggleWind);
    }
  }
  _deselectFeelsLike(){
    const feelsSelected = this.shadowRoot.querySelector("#feelsLike").classList.contains("selected");

    if(feelsSelected) {
      this.shadowRoot.querySelector("#feelsLike").classList.remove("selected");
      var toggleFeelsLike = new CustomEvent('forecast-header.toggle-feels-like', {bubbles: true, composed: true});
      this.dispatchEvent(toggleFeelsLike);
  
    }
  }


  _parseHour(timestamp) {
    const date = new Date(timestamp);
    return date.getHours();
  }

  /*
   * Round to one decimal. Add decimal to even numbers.
   * */
  _round(temperature) {
    return Math.round((temperature) * 10) / 10;
  }
}

window.customElements.define(ForecastHeader.is, ForecastHeader);
