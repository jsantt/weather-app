import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


class WindHelper extends PolymerElement {
  
  static get is() { return 'wind-helper'; }

  constructor() {
    super();

    /**
     * 8–13 m/s	navakkaa tuulta
     * 14–20 m/s	kovaa tuulta
     * 21–32 m/s	myrskyä
     * yli 32 m/s	hirmumyrskyä
     */
    this._WIND_TABLE = [
      {min: 8, max: 14, rate: 1, description: 'tuulista'}, 
      {min: 14, max: 21, rate: 2, description: 'kovaa tuulta'},
      {min: 21, max: 32, rate: 3, description: 'myrskyä'},
      {min: 32, max: 99, rate: 3,description: 'hirmumyrskyä'}
    ]; 
  }

  windWarning(forecastData){
    const maxWind = this._max(forecastData, 'wind');
    const windDescription = this._windDescription(maxWind);
    const windRating = this._windClassification(maxWind);

    return {rating: windRating, description: windDescription};
  }


  _windClassification(windSpeed){
    if(Number.isNaN(windSpeed) || windSpeed < 8){
      return 0;
    }

    const rows = this._WIND_TABLE.filter(
      (item) => item.min <= windSpeed && windSpeed < item.max);

      return rows[0].rate;
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
}

window.customElements.define(WindHelper.is, WindHelper);
