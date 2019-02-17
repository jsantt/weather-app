import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import './day-item.js';
import './rain-amount.js';
import './rain-helper.js';
import './snow-amount.js';
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
      }

      .day-name {
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
      
        text-align: center;

        color: var(--color-gray--dark);
        /*font-weight: 700;*/
        margin-bottom: 0.75rem;
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
        opacity: 0.1;
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
        z-index: 1;
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
      }
      .feelsLike--empty, .wind--empty{
        background-color: var(--color-toggle-background);
      }


      .wind-icon {
        vertical-align: sub;
        fill: #0060e8;
      }

      .wind-warning {
        padding-left: 0.5rem;
        color: #0060e8;
      }
      .rain-amount {
        float: right;
        padding-right: 0.5rem;
        color: #0060e8;
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

    <div class="weatherDay">
     
      <div class="weatherDay_grid">
        
        <div class="day">
            <span class="day-name">[[_day(dayNumber)]]</span>
            <span class="separator"></span>
            <span class="day-name">[[_weekday(dayNumber)]]</span>

            <span class="wind-warning">
              
              <wind-helper></wind-helper>
              <template is="dom-repeat" items="[[_arrayForRepeater(forecastData)]]">
                <svg
                  class="wind-icon"
                  width="16" 
                  height="16" 
                  viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M287.64,94.921c-31.721,0-57.528,25.807-57.528,57.528h34.517c0-12.688,10.323-23.011,23.011-23.011
                        c12.688,0,23.011,10.323,23.011,23.011c0,12.688-10.323,23.011-23.011,23.011H46.022v34.517H287.64
                        c31.721,0,57.528-25.807,57.528-57.528C345.169,120.728,319.361,94.921,287.64,94.921z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M431.461,106.427c-34.893,0-63.281,28.388-63.281,63.281c0,25.377,20.646,46.022,46.022,46.022
                        c25.377,0,46.022-20.646,46.022-46.022h-34.517c0,6.344-5.161,11.506-11.506,11.506c-6.344,0-11.506-5.161-11.506-11.506
                        c0-15.861,12.904-28.764,28.764-28.764c25.377,0,46.022,20.646,46.022,46.022c0,25.377-20.646,46.022-46.022,46.022H0v34.517
                        h431.461c44.409,0,80.539-36.13,80.539-80.539C512,142.557,475.87,106.427,431.461,106.427z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M345.169,290.517H46.022v34.517h299.146c15.861,0,28.764,12.904,28.764,28.764c0,15.861-12.904,28.764-28.764,28.764
                        c-15.86,0-28.764-12.904-28.764-28.764h-34.517c0,34.893,28.388,63.281,63.281,63.281c34.893,0,63.281-28.388,63.281-63.281
                        C408.449,318.905,380.062,290.517,345.169,290.517z"/>
                    </g>
                  </g>
                  </svg>
              </template>
               [[_windDescription(forecastData)]]
            </span>
            <span class="rain-amount">
              <rain-helper></rain-helper>
              <snow-amount snow-amount="[[_snow(forecastData)]]"></snow-amount>
              <rain-amount rain-amount="[[_rain(forecastData)]]"></rain-amount>
            </span>
        </span></span></div>
        
        <!-- headers here outside of dom-repeat -->    

        <template is="dom-if" if="[[showWind]]">
          <div class="wind_header">&nbsp;</div>
        </template>

        <template is="dom-if" if="[[showFeelsLike]]">
          <div class="feelsLike_header">&nbsp;</div>
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

  _arrayForRepeater(forecastData) {
    const number = this._windRating(forecastData);
    return new Array(number).fill(number);
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

  _windDescription(windToday) {
    return this.shadowRoot.querySelector('wind-helper').windWarning(windToday).description;
  }
  
  _windRating(windToday) {
    return this.shadowRoot.querySelector('wind-helper').windWarning(windToday).rating;
  }

  _windClassification(windSpeed){
    return this.shadowRoot.querySelector('wind-helper').windClassification(windSpeed);
  }

  _everyFourth(index, item) {
    return index % 3 === 0 ? this._hideNaN(item) : '';
  }

  _rain(forecastData) {
    return this.shadowRoot.querySelector('rain-helper').totalRain(forecastData);
  }

  _snow(forecastData) {
    return this.shadowRoot.querySelector('rain-helper').totalSnow(forecastData);
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
