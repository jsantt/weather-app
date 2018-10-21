import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import {getByAttributeValue, getTime, getTimeAndValuePairs, getValue, parseLocationName, raiseEvent, value} from './xml-parser.js';


/**  
 *  Fetches weather forecast from Ilmatieteenlaitos. Prefer "Harmonie" model
 *  and do another call against Hirlam to get weather symbol and rain that are 
 *  missing from Harmonie. 
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
        timeout="18000">
      </iron-ajax>

      <iron-ajax 
        id="weatherHirlam" 
        url="https://opendata.fmi.fi/wfs"
        params="{{_getHirlamParams(weatherLocation)}}" 
        handle-as="document" 
        timeout="18000">
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

  
  // other functions alphabetically

  _combine(humidity, rain, symbol, temperature, wind, windDirection) {
    
    let weatherJson = [];

    for (let i = 0; i < temperature.length; i++) {
      weatherJson.push(
        { 
          "humidity": getValue(humidity[i]),
          "rain": getValue(rain[i]),
          "symbol": getValue(symbol[i]),
          "time": getTime(temperature[i]),
          "temperature": getValue(temperature[i]),
          "wind": getValue(wind[i]),
          "windDirection": getValue(windDirection[i])
        });
    };

    return weatherJson;
  }

  _combineDatas(harmonie, hirlam) {
    let combinedData = this._combine(harmonie.humidity, hirlam.rain, hirlam.symbol, harmonie.temperature, harmonie.wind, harmonie.windDirection);

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

  _feelsLike(t, v) {
    let feelsLike3 = 13.12 + 0.6215*0.80 - 13.956*Math.pow(5, 0.16) + 0.4867*0.80*Math.pow(5,0.16)
  }

  _getHarmonieParams(location){
  
    let params = this._commonParams(location);

    params.storedquery_id = 'fmi::forecast::harmonie::surface::point::timevaluepair';
    params.parameters = 'Humidity,Temperature,WindDirection,WindSpeedMS';
    
    return params;
  }

   _getHirlamParams(location){
   
    let params = this._commonParams(location);
    
    params.storedquery_id = 'fmi::forecast::hirlam::surface::point::timevaluepair';
    params.parameters = 'Precipitation1h,WeatherSymbol3';
     
    return params;
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
    else {
      params.place = location.city;
    }
    
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
   _harmonieResponse(response) {

    const timeSeries = response.getElementsByTagName('wml2:MeasurementTimeseries');
    
    let harmonieResponse = {};

    harmonieResponse.humidity = getTimeAndValuePairs(timeSeries, 'mts-1-1-Humidity', 'humidity');
    harmonieResponse.temperature = getTimeAndValuePairs(timeSeries, 'mts-1-1-Temperature', 'temperature');
    harmonieResponse.wind = getTimeAndValuePairs(timeSeries, 'mts-1-1-WindSpeedMS', 'wind');
    harmonieResponse.windDirection = getTimeAndValuePairs(timeSeries, 'mts-1-1-WindDirection', 'windDirection');
    
    return harmonieResponse;
  }

  _hirlamResponse(response) {
  
    const timeSeries = response.getElementsByTagName('wml2:MeasurementTimeseries');
    
    let hirlamResponse = {};

    hirlamResponse.rain = getTimeAndValuePairs(timeSeries, 'mts-1-1-Precipitation1h', 'rain');
    hirlamResponse.symbol = getTimeAndValuePairs(timeSeries, 'mts-1-1-WeatherSymbol3', 'symbol');
    
    return hirlamResponse;
  }

  /** 
   *trigger call to get hirlam and harmonie weather data
   */
  _newLocation() {
    this.fetchError = false;
    this.loading = true;

    const harmonieRequest = this._prepareRequest('weatherHarmonie', this._getHarmonieParams(this.weatherLocation));
    const hirlamRequest = this._prepareRequest('weatherHirlam', this._getHirlamParams(this.weatherLocation));

    Promise.all([harmonieRequest.completes, hirlamRequest.completes])
      .then((values) => {
        this._sendNotification(
          this._parseLocationGeoid(values[0].response),
          parseLocationName(values[0].response),
          this.weatherLocation.coordinates
        );
        
        const harmonieResponse = this._harmonieResponse(values[0].response);
        const hirlamResponse = this._hirlamResponse(values[1].response);

        this.forecastData = this._combineDatas(harmonieResponse, hirlamResponse);
      })
      .catch(rejected => {
        this.fetchError = true;
        raiseEvent(this, 'forecast-data.fetch-error', {text: 'Virhe haettaessa ennustetietoja'});
        console.log('error ' + rejected.stack);
      })
      .finally(() => {
        this.loading = false;
        raiseEvent(this, 'forecast-data.fetch-done', {text: 'Fetch data done'});
      });
  }

  _prepareRequest(id, params){
    this.$[id].params = params;
    return this.$[id].generateRequest();
  }


  /* <gml:name codeSpace="http://xml.fmi.fi/namespace/locationcode/name">Kattilalaakso</gml:name> 
  <gml:identifier codeSpace="http://xml.fmi.fi/namespace/stationcode/geoid">7521689</gml:identifier>*/
  _parseLocationGeoid(response){
    const locations = response.getElementsByTagName('gml:identifier');
    const locationRow = getByAttributeValue(locations, 'codeSpace', 'http://xml.fmi.fi/namespace/stationcode/geoid');

    const location = value(locationRow);

    return location;
  }

  _sendNotification(geoid, name, coordinates) {
    const details = {
      location: {
        geoid: geoid,
        name: name,
        coordinates: coordinates
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
