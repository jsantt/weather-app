import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import {getByAttributeValue, getTime, getTimeAndValuePairs, getValue, parseLocationName, raiseEvent, value, parseRegion} from './xml-parser.js';


/**  
 *  Fetches weather forecast from Ilmatieteenlaitos' "Harmonie" weather model API. 
 * 
 *  Exposes the data in forecastData property in the following format:
 * [{ hour: 1
 *    humidity: 50
 *    past: true|false
 *    rain: 0
 *    symbol: 1
 *    temperature: 11.3
 *    time: "2018-09-26T22:00:00Z"
 *    wind: 7.6
 *    windDirection: 296 }, {...}]
 */
class ForecastData extends PolymerElement {
  static get is() { return 'forecast-data'; }
  static get template() {
    return html`
    
      <iron-ajax 
        id="weatherHarmonie" 
        url="https://opendata.fmi.fi/wfs" 
        params="{{_getHarmonieParams(weatherLocation)}}"
        handle-as="document" 
        timeout="8000">
      </iron-ajax>
    `;
  }


  static get properties() {
    return {
      weatherLocation: {
        type: Object,
        observer: '_newLocation'
      },
  
      forecastData: {
        type: Array,
        notify: true
      },

      fetchError: {
        type: Boolean,
        notify: true,
        value: false
      },

      forecastPlace: {
        type: Object,
        notify: true
      },

      loading: { 
        type: Boolean,
        notify: true,
        value: false
      }
    };
  }

  // Lifecycle functions

  ready() {
    super.ready();
  }

  /** 
   * Fetches the data from the backend
   */
  _newLocation() {
    this.fetchError = false;
    this.loading = true;

    const harmonieRequest = this._prepareRequest('weatherHarmonie', this._getHarmonieParams(this.weatherLocation));
    harmonieRequest.completes
      .then((data) => {
        this._sendNotification(
          this._parseLocationGeoid(data.response),
          parseLocationName(data.response),
          this.weatherLocation.coordinates,
          parseRegion(data.response)
        );
        
        const filteredResponse = this._filterResponse(data.response);
        let json = this._toJson(filteredResponse);

        this.forecastData = this._enrichData(json);
      })
      .catch(rejected => {
        this.fetchError = true;
        raiseEvent(this, 'forecast-data.fetch-error', {text: 'Virhe haettaessa ennustetietoja'});
        console.log('error ' + rejected.stack);
      })
      .then(() => {
        this.loading = false;
        raiseEvent(this, 'forecast-data.fetch-done', {text: 'Fetch data done'});
      });
  }

  _prepareRequest(id, params){
    this.$[id].params = params;
    return this.$[id].generateRequest();
  }

  _commonParams(location) {
    let params = {
      "request":"getFeature",
      "starttime": this._todayFirstHour(),
      "endtime": this._tomorrowLastHour(),
    }
    if(location.coordinates) {
      params.latlon = location.coordinates;
    }
    else { // TODO: remove this branch if unused?
      params.place = location.city;
    }
    
    return params;
  }

  _getHarmonieParams(location){
  
    let params = this._commonParams(location);

    params.storedquery_id = 'fmi::forecast::harmonie::surface::point::timevaluepair';
    params.parameters = 'Humidity,Temperature,WindDirection,WindSpeedMS,WindGust,Precipitation1h,WeatherSymbol3';
    
    return params;
  }


  /**
   * Data comes from the following format from FMI open API
   * 
   *	...
   * <wml2:MeasurementTimeseries gml:id="mts-1-1-Temperature">
         *		<wml2:point>
         *			<wml2:MeasurementTVP>
         *				<wml2:time>2018-01-09T20:00:00Z</wml2:time>
         *				<wml2:value>-2.41</wml2:value>
   *  ...
   * <wml2:MeasurementTimeseries gml:id="mts-1-1-WeatherSymbol3">
         *		...
   * <wml2:MeasurementTimeseries gml:id="mts-1-1-Precipitation1h">
         *    ...
   * <wml2:MeasurementTimeseries gml:id="mts-1-1-WindSpeedMS">
   *    ...
   * <wml2:MeasurementTimeseries gml:id="mts-1-1-WindDirection">
   *    ...
   * <wml2:MeasurementTimeseries gml:id="mts-1-1-Humidity">  
   * 
   * 
   * And it is converted to the following JSON and stored into this.forecastData 
   * 
   * [
   *    {hour:1, rain: NaN, symbol: NaN, temperature: NaN, time: "2018-03-02T23:00:00Z", wind: NaN, windDirection: NaN}
   *    {hour:2, ...}
   * ]
   */
  _filterResponse(response) {

    const timeSeries = response.getElementsByTagName('wml2:MeasurementTimeseries');
    
    let harmonieResponse = {};

    harmonieResponse.humidity = getTimeAndValuePairs(timeSeries, 'mts-1-1-Humidity', 'humidity');
    harmonieResponse.rain = getTimeAndValuePairs(timeSeries, 'mts-1-1-Precipitation1h', 'rain');
    harmonieResponse.symbol = getTimeAndValuePairs(timeSeries, 'mts-1-1-WeatherSymbol3', 'symbol');
    harmonieResponse.temperature = getTimeAndValuePairs(timeSeries, 'mts-1-1-Temperature', 'temperature');
    harmonieResponse.wind = getTimeAndValuePairs(timeSeries, 'mts-1-1-WindSpeedMS', 'wind');
    harmonieResponse.windDirection = getTimeAndValuePairs(timeSeries, 'mts-1-1-WindDirection', 'windDirection');
    harmonieResponse.windGust = getTimeAndValuePairs(timeSeries, 'mts-1-1-WindGust', 'windGust');
    

    return harmonieResponse;
  }


  _toJson(data) {
    
    let weatherJson = [];

    for (let i = 0; i < data.temperature.length; i++) {
      
      const temperatureValue = getValue(data.temperature[i]);
      const windValue = getValue(data.wind[i]);
      
      weatherJson.push(
        { 
          "feelsLike": this._feelsLike(temperatureValue, windValue),
          "humidity": getValue(data.humidity[i]),
          "rain": getValue(data.rain[i]),
          "symbol": getValue(data.symbol[i]),
          "time": getTime(data.temperature[i]),
          "temperature": temperatureValue,
          "wind": windValue, 
          "windDirection": getValue(data.windDirection[i]),
          "windGust": getValue(data.windGust[i])
        });
    };

    return weatherJson;
  }

  _enrichData(combinedData) {
    
    // enrich data to avoid application logic inside components
    const now = new Date();
    combinedData.forEach( element => {
      element.hour = this._toHour(element.time);
      element.past = this._isPast(now, element.time);
    });

    return combinedData;
  }

  _isPast(now, dateTime) {
    const comparable = new Date(dateTime);
    
    return now > comparable;
  }

  /**
   * Calculates "feels like" estimate based on wind and temperature.
   * Formula by Ilmatieteen laitos: https://fi.wikipedia.org/wiki/Pakkasen_purevuus
   * 
   * @param {*} temperature in celcius 
   * @param {*} wind metres per second
   */
  _feelsLike(temperature, wind) {
    const feelsLike = 13.12 + 0.6215*temperature - 13.956*Math.pow(wind, 0.16) + 0.4867*temperature*Math.pow(wind,0.16);
    return Math.round(feelsLike);
  }
  


  /* <gml:name codeSpace="http://xml.fmi.fi/namespace/locationcode/name">Kattilalaakso</gml:name> 
  <gml:identifier codeSpace="http://xml.fmi.fi/namespace/stationcode/geoid">7521689</gml:identifier>*/
  _parseLocationGeoid(response){
    const locations = response.getElementsByTagName('gml:identifier');
    const locationRow = getByAttributeValue(locations, 'codeSpace', 'http://xml.fmi.fi/namespace/stationcode/geoid');

    const location = value(locationRow);

    return location;
  }

  _sendNotification(geoid, name, coordinates, region) {
    const details = {
      location: {
        geoid: geoid,
        name: name,
        coordinates: coordinates,
        region: region
      }
    };
    this.forecastPlace = details.location;
    raiseEvent(this, 'forecast-data.new-place', details);
  }

  _todayFirstHour() {
    
    let firstHour = new Date();
    firstHour.setHours(1,0,0,0);
  
    return firstHour.toISOString();
  }

  _toHour(time){
    
    if (typeof time === 'number'){
      return time;
    }

    const dateObject = new Date(time);
    let hour = dateObject.getHours(); 

    return hour === 0 ? 24 : dateObject.getHours();
  }

  _tomorrowLastHour() {
    const now = new Date();

    let tomorrow = new Date()
    tomorrow.setDate(now.getDate() + 2);
    tomorrow.setHours(24,0,0,0);

    return tomorrow.toISOString();
  }
}

window.customElements.define(ForecastData.is, ForecastData);
