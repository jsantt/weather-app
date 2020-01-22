import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./weather-day.js";

class WeatherDays extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        margin-top: calc(-1*var(--header-background-expand));
      }
      .visually-hidden {
          position: absolute !important;
          clip: rect(1px, 1px, 1px, 1px);
          padding:0 !important;
          border:0 !important;
          height: 1px !important; 
          width: 1px !important; 
          overflow: hidden;
        }
    </style>

      <h3 class="visually-hidden">sää tänään</h2>
      <weather-day 
        class="weatherGrid" 
        day-number="1"
        min-temperature="[[minTemperature]]"
        show-feels-like="[[showFeelsLike]]" 
        show-wind="[[showWind]]"
        show-wind-gust="[[showWindGust]]"
        day-data="[[todayData]]"></weather-day>
  
      <h3 class="visually-hidden">sää huomenna</h2>
      <weather-day 
        class="weatherGrid" 
        day-number="2" 
        min-temperature="[[minTemperature]]"
        show-feels-like="[[showFeelsLike]]" 
        show-wind="[[showWind]]" 
        show-wind-gust="[[showWindGust]]" 
        day-data="[[day2Data]]"></weather-day>

      <h3 class="visually-hidden">sää ylihuomenna</h2>
      <weather-day 
        class="weatherGrid" 
        day-number="3" 
        min-temperature="[[minTemperature]]"
        show-feels-like="[[showFeelsLike]]" 
        show-wind="[[showWind]]"
        show-wind-gust="[[showWindGust]]" 
        day-data="[[day3Data]]"></weather-day>
`;
  }

  static get is() {
    return "weather-days";
  }

  static get properties() {
    return {
      forecastData: {
        type: Array
      },

      showFeelsLike: {
        type: Boolean,
        reflectToAttribute: true
      },

      showWind: {
        type: Boolean,
        reflectToAttribute: true
      },
      showWindGust: {
        type: Boolean,
        reflectToAttribute: true
      },
      todayData: {
        type: Array,
        computed: "_sliceToday(forecastData)"
      },

      day2Data: {
        type: Array,
        computed: "_sliceDay2(forecastData)"
      },

      day3Data: {
        type: Array,
        computed: "_sliceDay3(forecastData)"
      },

      minTemperature: {
        type: Number,
        computed: "_minTemp(forecastData)"
      }
    };
  }

  // for computed properties

  _sliceToday(data) {
    return data.slice(0, 24);
  }

  _sliceDay2(data) {
    return data.slice(24, 48);
  }

  _sliceDay3(data) {
    return data.slice(48, 72);
  }

  _minTemp(data) {
    const min = data.reduce(function(previous, current) {
      const currentTemp = Number.isNaN(current.temperature)
        ? Number.MAX_VALUE
        : current.temperature;
      return previous.temperature < currentTemp ? previous : current;
    });
    return min.temperature;
  }
}

window.customElements.define(WeatherDays.is, WeatherDays);
