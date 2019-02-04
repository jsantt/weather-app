import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import './day-item.js';
import './temperature-line.js';
import './weather-chart.js';

import '../weather-symbol.js';
import './wind-helper.js';
import '../wind-icon.js';

class WeatherDay extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        --grid-last-column: 25;

        --margin-after-hours: 1rem;
        --margin-after-wind: 1.2rem;

        --color-dayHeader: var(--color-secondary);
        --color-dayHeader-delimiter: var(--color-gray--light);

        --color-dayHeader-font: var(--color-gray--dark);

        --color-toggle-background: #00000005;

      }

      .weatherDay {
        min-height: 8rem;
        position: relative;
      }

      .weatherDay_grid {
        display: grid;
        grid-row-gap: 0;
        grid-template-columns: repeat(25, 1fr);
        grid-template-rows: minmax(1.4rem, auto);
      }

      .day {
        background-color: var(--color-dayHeader);
        border-top: 2px solid var(--color-dayHeader-delimiter);

        color: var(--color-dayHeader-font);
        	
        font-size: var(--font-size-small);
        grid-column: span 25;
        grid-row: 1;

        padding-left: 0.5rem;
        text-transform: uppercase;
      }

      .symbol_svg {
        width: 32px;
      }

      .hour, .hour--empty {
        background-color: var(--color-dayHeader);
        font-size: var(--font-size-small);
      
        grid-row: 2; 
        grid-column: span 1 /*3*/;

        margin-bottom: var(--margin-after-hours);        
        text-align: center;

        color: var(--color-gray--dark);
        font-weight: 700;

      }
      .hour--empty {
        grid-column: span 1;
      }
      
      .hour--dot {
        color: var(--color-gray--light);
        font-size: 0.75rem;
      }

      .hour--past {
        color: var(--color-gray--light);
      }

      .past-hour {
        opacity: 0.3;
      }

      .symbol, .symbol--empty {
        grid-column: span 3;
        grid-row: 3;  
        text-align: center;
      }
      .symbol--empty {
        grid-column: span 1;
      }


      .temperature, .temperature--empty {
        grid-column: span 3;
        grid-row: 4;

        font-size: var(--font-size-medium);
        text-align: center;
        z-index: 1;
      }

       .temperature_line {
        grid-column: span 25;
        grid-row: 5;
        height: 0;
      }

      .feelsLike_footer, .wind_footer, .feelsLike_header, .wind_header {
        font-size: var(--font-size-xsmall);
        background-color: var(--color-toggle-background);
        padding-left: 0.5rem;
        grid-column: span 25;
      }

    
      .feelsLike_header {
        grid-row: 6;
        
      }
      .feelsLike, .feelsLike--empty {
        grid-row:7;
      }
      .feelsLike_footer {
        grid-row:8;
      }

      .wind_header {
        grid-row: 9;
       
      }

      .wind, .wind--empty {
        grid-row: 10;
        
      }

      .wind_footer {
        grid-row: 11;
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
      }
      .feelsLike--empty, .wind--empty{
        background-color: var(--color-toggle-background);
      }

      .rainBars{
        grid-column: span 25;
        grid-row: 12;
        padding-top: 1.5rem;
      }

      .feelsLikeValue {
        font-size: 16px;
      }
    </style>

    <!-- data components for getting warning texts & background colors -->
    <wind-helper></wind-helper>

    <div class="weatherDay">
     
      <div class="weatherDay_grid">
        
        <div class="day">
            <span>[[_day(dayNumber)]]<span>
            <span class="separator">/</span>
            <span>[[_weekday(dayNumber)]]</span>
        </span></span></div>
        
        <!-- headers here outside of dom-repeat -->    

        <template is="dom-if" if="[[showWind]]">
          <div class="wind_header">[[_windHeaderText(forecastData)]]</div>
        </template>

        <template is="dom-if" if="[[showFeelsLike]]">
          <div class="feelsLike_header">tuntuu kuin</div>
        </template>

        <template is="dom-repeat" items="[[forecastData]]" as="entry">
          
          <!-- EMPTY COLUMN -->
          <template is="dom-if" if="[[_isFirst(index)]]">
            
            <div class="symbol--empty"></div>
            <div class="temperature--empty"></div>
            <div class="feelsLike--empty"></div>
            <div class="wind--empty"></div>
            
          </template>
       
          <template is="dom-if" if="[[!_isFourth(index)]]">
            <div class$="[[_getClasses(entry.past, 'hour hour--dot', 'hour--past')]]">
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
                  wind-color="[[_windClassification(entry.wind)]]"
                  wind-gust-color="[[_windClassification(entry.windGust)]]"
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
            forecast-data="[[forecastData]]">
          </temperature-line>
    
        </div>

        <section class="rainBars">

          <weather-chart 
            min-temperature="[[minTemperature]]" 
            forecast-data="[[forecastData]]">
          </weather-chart>

        </section>
      </div>
    </div>
`;
  }

  static get is() { return 'weather-day'; }

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

      forecastData: {
        type: Array          
      }
    };
  }

  _day(number){
    const dayNames = ['Tänään', 'Huomenna', 'Ylihuomenna'];
    return dayNames[number - 1];
  }

  _getClasses(showBoth, baseClasses, pastClass) {
    const classes = showBoth ? baseClasses.concat(' ').concat(pastClass) : baseClasses;
    return classes;
  }

  _weekday(number){
    let day = new Date();
    day.setDate(day.getDate() + (number - 1));
    return day.toLocaleString('fi-FI', {weekday: 'short'});
  }

  _windHeaderText(windToday) {
    return this.shadowRoot.querySelector('wind-helper').windHeaderText(windToday);
  }
  
  _windClassification(windSpeed){
    return this.shadowRoot.querySelector('wind-helper').windClassification(windSpeed);
  }

  _everyFourth(index, item) {
    return index % 3 === 0 ? this._hideNaN(item) : '';
  }

  _round(item){
    const rounded = Math.round(item);
    const result = Number.isNaN(rounded) ? '' : rounded;

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
