import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "./day-item.js";
import "./rain-amount.js";
import "./rain-helper.js";

import "./snow-amount.js";
import "./temperature-line.js";
import "./weather-chart.js";

import "./wind-speed.js";
import "../weather-symbol.js";
import "./wind-helper.js";
import "../wind-icon.js";

class WeatherDay extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        --grid-last-column: 25;

        --color-dayHeader: var(--color-secondary);
        --color-dayHeader-delimiter: var(--color-gray--light);

        --color-dayHeader-font: var(--color-gray--dark);

        --color-toggle-background: rgba(240,240,240, 0.8);
      }

      .weatherDay {
        min-height: 8rem;
        position: relative;
        margin: 0.25rem 0;
      }

      .weatherDay_grid {
        background-color: #fff;
        display: grid;
        grid-row-gap: 0;
        grid-template-columns: repeat(25, 1fr);
        grid-template-rows: minmax(1.4rem, auto);
      }

      .day {
        background-color: var(--color-dayHeader);
        /*border-top: 2px solid var(--color-dayHeader-delimiter);*/

        color: var(--color-dayHeader-font);
        	
        font-size: var(--font-size-small);
        grid-column: span 25;
        grid-row: 1;

        padding-left: 0.5rem;
      }

      .day-name {
        display: inline-block;
        font-size: var(--font-size-small);
        text-transform: uppercase;
        font-weight: 400;
        padding: 0;
        margin: 0;
      }

      .symbol_svg {
        width: 32px;
      }

      .hour, .hour--empty {
        background-color: var(--color-dayHeader);
        font-size: var(--font-size-small);
      
        grid-row: 2; 
        grid-column: span 1 /*3*/;
      
        text-align: center;

        color: var(--color-gray--dark);
        /*font-weight: 700;*/
        margin-bottom: 0.75rem;
      }
      .hour--empty {
        grid-column: span 1;
      }
      
      .hour--dot {
        color: #fff;
        font-size: 0.75rem;
      }

      .hour--past {
        color: var(--color-gray--light);
      }

      .dot--past {
        color: var(--color-dayHeader);
      }

      .past-hour {
        opacity: 0.1;
        z-index: 1;
      }

      .symbol, .symbol--empty {
        grid-column: span 3;
        grid-row: 4;  
        text-align: center;
      }
      .symbol--empty {
        grid-column: span 1;
      }


      .temperature, .temperature--empty {
        grid-column: span 3;
        grid-row: 5;

        font-size: var(--font-size-medium);
        text-align: center;
        z-index: 2;
      }

       .temperature_line {
        grid-column: span 25;
        grid-row: 6;
        height: 0;
      }

      .feelsLike_footer, .wind_footer, .feelsLike_header, .wind_header {
        font-size: var(--font-size-xsmall);
        background-color: var(--color-toggle-background);
        padding-left: 0.5rem;
        grid-column: span 25;
        z-index:2;
      }

    
      .feelsLike_header {
        grid-row: 7;
        
      }
      .feelsLike, .feelsLike--empty {
        grid-row:8;
      }
      .feelsLike_footer {
        grid-row:9;
      }

      .wind_header {
        grid-row: 10;
       
      }

      .wind, .wind--empty {
        grid-row: 11;
        
      }

      .wind_footer {
        grid-row: 12;
      }

      .temperature--empty, .feelsLike--empty, .wind--empty{
        grid-column: span 1;
      }

      .wind, .feelsLike {
        grid-column: span 3;
        font-size: var(--font-size-medium);
        text-align: center;
        padding-bottom: 0.5rem;

        background-color: var(--color-toggle-background);
        z-index:2;
      }
      .feelsLike--empty, .wind--empty{
        background-color: var(--color-toggle-background);
        z-index:2;
      }


      .wind-icon {
        vertical-align: sub;
        fill: #0060e8;
      }

      .wind-warning {
        padding-left: 0.5rem;
      }
      .rain-amount {
        float: right;
        padding-right: 0.5rem;
        color: #0060e8;
      }
      rain-amount, snow-amount {
        padding-left: 0.5rem;
      }

      .rainBars{
        grid-column: span 25;
        grid-row: 12;
        padding-top: 1.5rem;
        z-index: 1;
      }

      .feelsLikeValue {
        font-size: 16px;
      }
    </style>

    <div class="weatherDay">
     
      <div class="weatherDay_grid">
        
        <div class="day">
            <h3 class="day-name">[[_day(dayNumber)]] [[_weekday(dayNumber)]]</h3>

            <span class="wind-warning">
              <wind-helper></wind-helper>
              <wind-speed 
                wind-rating="[[_windRating(dayData)]]" 
                wind-description="[[_windDescription(dayData)]]">
              </wind-speed>
            </span>
            <span class="rain-amount">
              <rain-helper></rain-helper>
              <snow-amount snow-amount="[[_snow(dayData)]]"></snow-amount>
              <rain-amount rain-amount="[[_rain(dayData)]]"></rain-amount>
            </span>
        </span></span></div>
        
        <!-- headers here outside of dom-repeat -->    

        <template is="dom-if" if="[[showWind]]">
          <div class="wind_header">keskituuli / tuuli puuskissa</div>
        </template>

        <template is="dom-if" if="[[showFeelsLike]]">
          <div class="feelsLike_header">tuntuu kuin</div>
        </template>

        <template is="dom-repeat" items="[[dayData]]" as="entry">
          
          <!-- EMPTY COLUMN -->
          <template is="dom-if" if="[[_isFirst(index)]]">
            
            <div class="symbol--empty"></div>
            <div class="temperature--empty"></div>
            <div class="feelsLike--empty"></div>
            <div class="wind--empty"></div>
            
          </template>
       
          <template is="dom-if" if="[[!_isFourth(index)]]">
            <div class$="[[_getClasses(entry.past, 'hour hour--dot', 'dot--past')]]">
              .
            </div>
          </template>
       
          <!-- HOUR, SYMBOL & TEMPERATURE -->
          <template is="dom-if" if="[[_isFourth(index)]]">

            <div class$="[[_getClasses(entry.past, 'hour', 'hour--past')]]">
                  [[entry.hour]]
            </div>
            
            <div class$="[[_getClasses(entry.past, 'symbol', 'past-hour')]]">
              <weather-symbol symbol-id="[[_symbolId(entry)]]"></weather-symbol>
            </div>
            
            <div class$="[[_getClasses(entry.past, 'temperature', 'past-hour')]]">
              
              <template is="dom-if" if="{{_notNaN(entry.temperature)}}">  
                {{_round(entry.temperature)}}<span class="degree">°</span>   
              </template>

            </div>

            <template is="dom-if" if="[[showWind]]">
              <div class="wind">
                <wind-icon 
                  class$="[[_getClasses(entry.past, 'symbol', 'past-hour')]]"
                  degrees="[[entry.windDirection]]" 
                  wind-speed="[[entry.wind]]"
                  wind-gust-speed="[[entry.windGust]]">
                </wind-icon>
              </div>
            </template>

            <template is="dom-if" if="[[showFeelsLike]]">
              <div class="feelsLike">

                <div  class$="[[_getClasses(entry.past, 'symbol', 'past-hour')]]">
                  <template is="dom-if" if="{{_notNaN(entry.feelsLike)}}">
                    [[entry.feelsLike]]<span class="degree">°</span>  
                  </template>
                </div>
              </div>
            </template>
            
          </template>  
            
        </template>

        <div class="hour hour--empty">
        </div>
      
        <div class="temperature_line">
            
          <temperature-line 
            min-temperature="[[minTemperature]]" 
            day-data="[[dayData]]">
          </temperature-line>
    
        </div>

        <section class="rainBars">

          <weather-chart 
            min-temperature="[[minTemperature]]" 
            day-data="[[dayData]]">
          </weather-chart>

        </section>
      </div>
    </div>
`;
  }

  static get is() {
    return "weather-day";
  }

  static get properties() {
    return {
      dayNumber: {
        type: Number
      },

      minTemperature: {
        type: Number
      },

      showTimeNow: {
        type: Boolean,
        value: false
      },

      showFeelsLike: {
        type: Boolean
      },

      showWind: {
        type: Boolean
      },

      dayData: {
        type: Array
      }
    };
  }

  _day(number) {
    const dayNames = ["Tänään", "Huomenna", "Ylihuomenna"];
    return dayNames[number - 1];
  }

  _getClasses(showBoth, baseClasses, pastClass) {
    const classes = showBoth
      ? baseClasses.concat(" ").concat(pastClass)
      : baseClasses;
    return classes;
  }

  _weekday(number) {
    let day = new Date();
    day.setDate(day.getDate() + (number - 1));
    return day.toLocaleString("fi-FI", { weekday: "short" });
  }

  _windDescription(dayData) {
    return this.shadowRoot.querySelector("wind-helper").windWarning(dayData)
      .description;
  }

  _windRating(dayData) {
    return this.shadowRoot.querySelector("wind-helper").windWarning(dayData)
      .rating;
  }

  _everyFourth(index, item) {
    return index % 3 === 0 ? this._hideNaN(item) : "";
  }

  _rain(dayData) {
    return this.shadowRoot.querySelector("rain-helper").totalRain(dayData);
  }

  _snow(dayData) {
    return this.shadowRoot.querySelector("rain-helper").totalSnow(dayData);
  }

  _round(item) {
    const rounded = Math.round(item);
    const result = Number.isNaN(rounded) ? "" : rounded;

    return result;
  }

  _isFirst(index) {
    return index === 1;
  }

  _isFourth(index) {
    return (index + 1) % 3 === 0;
  }

  _notNaN(item) {
    return !Number.isNaN(item);
  }
  _symbolId(data) {
    return data.symbol;
  }
}

window.customElements.define(WeatherDay.is, WeatherDay);
