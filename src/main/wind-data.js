import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


class WindData extends PolymerElement {
  
  static get is() { return 'wind-data'; }

  constructor() {
    super();

    /**
     * 8–13 m/s	navakkaa tuulta
     * 14–20 m/s	kovaa tuulta
     * 21–32 m/s	myrskyä
     * yli 32 m/s	hirmumyrskyä
     */
    this._WIND_TABLE = [
      {min: 8, max: 14, warning: 1, description: 'navakkaa tuulta'}, 
      {min: 14, max: 21, warning: 2, description: 'kovaa tuulta'},
      {min: 21, max: 32, warning: 3, description: 'myrskyä'},
      {min: 32, max: 99, warning: 3,description: 'hirmumyrskyä'}
    ]; 
  }

  windClassification(windSpeed){
    if(Number.isNaN(windSpeed) || windSpeed < 8){
      return "0";
    }


    const rows = this._WIND_TABLE.filter(
      (item) => item.min <= windSpeed && windSpeed < item.max);

      return rows[0].warning;
  }

  windHeaderText(forecastData){
    return this._windForecast(forecastData);
  }

  windGustClassification(windSpeed) {
    return this.windClassification(windSpeed);
  }

  windGustHeaderText(forecastData) {
    return this._windGustForecast(forecastData);
  }

  _windForecast(forecastData){
    const maxWind = this._max(forecastData, 'wind');
    const description = this._windDescription(maxWind);

    return description === undefined ? 'keskituuli / tuuli puuskissa (m/s)' : `${description}`
  }

  _windGustForecast(forecastData) {
    const maxGust = Math.round(this._max(forecastData, 'windGust'));
    const description = this._windGustDescription(maxGust);

    return description === undefined ? 'tuuli puuskissa (m/s)' : `${description} puuskissa`
  }

  _max(forecastData, property) {
    let maxWind = 0;
    
    const upcomingHours = forecastData.filter(item => !item.past);

    upcomingHours.map(item => {
      maxWind = item[property] > maxWind ? item[property] : maxWind;
    });
    
    return maxWind;
  }

  _windDescription(maxWind) {
    let windDescription;

    this._WIND_TABLE.map(item => 
    {
      if(item.min <= maxWind && maxWind < item.max) {
        windDescription = item.description;
      }
    });
   
    return windDescription;
  }

  _windGustDescription(maxWind) {
    let windDescription;

    this._WIND_TABLE.map(item => 
    {
      if(item.min <= maxWind && maxWind < item.max) {
        windDescription = item.description;
      }
    });
   
    return windDescription;
  }
}

window.customElements.define(WindData.is, WindData);
