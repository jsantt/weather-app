import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


class WeatherNotification extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        box-sizing: border-box;
      }

      .notification {
        display: flex;
        align-content: stretch;
        align-items: stretch;
      }

      .notification_stripe {
        background-color:var(--color-gray);
        flex: 0 0 0.3rem;
      }

      .notification_content {
        background-color: var(--color-gray--light);
        flex: 1 1 auto;
        padding: 1rem;
      }

    </style>

    <template is="dom-if" if="[[_forecastText]]">
      <section class="notification">
        <div class="notification_stripe"></div>
        <div class="notification_content">
          Luvassa [[_forecastText]]. Katso tarkempi ennuste painamalla tuuli-ikonia.
        </div>
      </section>
    </template>
`;
  }

  static get is() { return 'weather-notification'; }

  static get properties() {
    return {
      _forecastText: {
        type: String,
        value: null
      },
      forecastData: {
        type: Array,
        observer: '_createTextualForecasts'
      }
    };
  }

  ready() {
    super.ready();
  }

  _createTextualForecasts(forecastData){
    this._forecastText = this._windForecast(forecastData);
  }

  _maxWind(forecastData) {
    let maxWind = 0;
    
    const upcomingHours = forecastData.filter(item => !item.past);
  
    upcomingHours.map(item => {
      maxWind = item.wind > maxWind ? item.wind : maxWind;
    });

    return maxWind;
  }

  _windForecast(forecastData){
    let maxWind = this._maxWind(forecastData);
    
    return this._windDescription(maxWind);
     
  }

  /**
   * 8–13 m/s	navakkaa tuulta
   * 14–20 m/s	kovaa tuulta
   * 21–32 m/s	myrskyä
   * yli 32 m/s	hirmumyrskyä
   */
  _windDescription(maxWind) {
    
    const windTable = [
      {min: 8, max: 14, description: 'navakkaa tuulta'}, 
      {min: 14, max: 21, description: 'kovaa tuulta'},
      {min: 21, max: 32, description: 'myrskyä'},
      {min: 32, max: 99, description: 'hirmumyrskyä'}
    ]; 

    let windDescription;

    windTable.map(item => 
    {
      if(item.min <= maxWind && maxWind < item.max) {
        windDescription = item.description;
      }
    });
   
    return windDescription;
  }
}

window.customElements.define(WeatherNotification.is, WeatherNotification);
