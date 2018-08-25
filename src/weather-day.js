import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './temperature-line.js';
import './weather-chart.js';
import './weather-symbol.js';
import './wind-icon.js';

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

      }

      .weatherDay {
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
        font-weight: 700;


        display: flex;
        align-items: flex-end;		
        justify-content: space-between;	
        
        grid-column: span 25;
        grid-row: 1;

        padding-left: 0.3rem;
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
        font-size: 0.75rem;
      }
      .hour--past {
        color: var(--color-gray--light);
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
      

      .temperature--empty {
        grid-column: span 1;
      }
      
      .wind, .wind--empty {
        grid-column: span 3;
        grid-row: 6;

        margin-top: 0.6rem;
        margin-bottom: var(--margin-after-wind);
        text-align: center;
      }
      .wind--empty {
        grid-column: span 1;
      }
      

      .lineChart{
        grid-column: span 25;
        grid-row: 7;
      }

    </style>
    <div class="weatherDay">
     
      <div class="weatherDay_grid">
        
        <div class="day">
            <span>[[_day(dayNumber)]]<span>
            <span class="separator">/</span>
            <span>[[_weekday(dayNumber)]]</span>
        </span></span></div>
        
        <template is="dom-repeat" items="[[forecastData]]" as="entry">
          
          <!-- EMPTY COLUMN -->
          <template is="dom-if" if="[[_isFirst(index)]]">
            
            <div class="symbol--empty"></div>
            <div class="temperature--empty"></div>
            <div class="wind--empty"></div>
          </template>

       
            <template is="dom-if" if="[[!_isFourth(index)]]">
              <div class$="[[_markPastDots(entry.hour)]]">
                .
              </div>
            </template>
       
          <!-- HOUR, SYMBOL & TEMPERATURE -->
          <template is="dom-if" if="[[_isFourth(index)]]">

            <div class$="[[_markPastHours(entry.hour)]]">
                  [[entry.hour]]
            </div>
            
            <div class="symbol">
                <weather-symbol symbol-id="[[_symbolId(entry)]]"></weather-symbol>
            </div>
            
            <div class="temperature">
              <template is="dom-if" if="{{_notNaN(entry.temperature)}}">  
                {{_round(entry.temperature)}}<span class="degree">°</span>   
              </template>
            </div>

            <template is="dom-if" if="[[showWind]]">
              <div class="wind">
      
                  <wind-icon degrees="[[entry.windDirection]]" round="" wind-speed="[[entry.wind]]">
                  </wind-icon>

              </div>
            </template>

          </template>  
            
        </template>

        <div class="hour hour--empty">
        </div>
      
        <div class="temperature_line">
            <temperature-line min-temperature="[[minTemperature]]" forecast-data="[[forecastData]]">
            </temperature-line>
      
          </div>

        <section class="lineChart">
        
          <weather-chart min-temperature="[[minTemperature]]" show-time-now="[[showTimeNow]]" forecast-data="[[forecastData]]"></weather-chart>

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
      highlightHour: {
        type: String
      },
      minTemperature: {
        type: Number
      },
      showTimeNow: {
        type: Boolean,
        value: false
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

  _markPastDots(current){
    
    let classes = 'hour hour--dot';

    if(this.highlightHour) {
      const date = new Date(this.highlightHour);

      if(date.getHours() === current) {
        classes += '  hour--current';
      }
      else if(date.getHours() > current) {
        classes += ' hour--past';
      }
    }
    return classes;
  }

  _markPastHours(current){
    
    let classes = 'hour';

    if(this.highlightHour) {
      const date = new Date(this.highlightHour);

      if(date.getHours() === current) {
        classes += '  hour--selected';
      }
      else if(date.getHours() > current) {
        classes += ' hour--past';
      }
    }
    return classes;
  }

  _weekday(number){
    let day = new Date();
    day.setDate(day.getDate() + (number - 1));
    return day.toLocaleString('fi-FI', {weekday: 'short'});
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
