import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import {getByAttributeValue, getTime, getTimeAndValuePairs, getValue, parseLocationName, raiseEvent, value} from './xml-parser.js';


/**  
 *  Fetch weather forecast from Ilmatieteenlaitos. Prefer "Harmonie" model
 *  and do another call against Hirlam to get weather symbol and rain that are 
 *  missing from Harmonie 
 */
class ForecastData extends PolymerElement {
  static get is() { return 'forecast-data'; }
  static get template() {
    return html`
    
      <iron-ajax 
        id="weatherHarmonie" 
        url="https://data.fmi.fi/fmi-apikey/412facb5-f1bc-44e7-88cc-dc9e08903e32/wfs" 
        params="{{_getHarmonieParams(weatherLocation)}}"
        handle-as="document" 
        timeout="8000">
      </iron-ajax>

      <iron-ajax 
        id="weatherHirlam" 
        url="https://data.fmi.fi/fmi-apikey/412facb5-f1bc-44e7-88cc-dc9e08903e32/wfs"
        params="{{_getHirlamParams(weatherLocation)}}" 
        handle-as="document" 
        timeout="8000">
      </iron-ajax>
    `;
  }


  static get properties() {
    return {
      place: {
        type: Number,
        computed: '_place(weatherLocation)'
      },

      weatherLocation: {
        type: Object,
        observer: '_newLocation'
      },

      /**
       * Example:
       * {
       *  temperature: '6,5'
       * }
       */
      weatherNowData: {
        type: Object,
        notify: true
      },

      /**
       * Example:
       * {
       *  time: '2018-01-07T10:00:00Z',
       *  temperature: 6
       * }, 
       * {...}
       */
      forecastData: {
        type: Array,
        notify: true
      },
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

    combinedData.forEach( element => {
      element.hour = this._toHour(element.time);
    });

    return combinedData;
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

    if(location.city && location.city !== '') {
      params.place = location.city;
    }
    else {
      params.latlon = location.latlon;
    }

    return params;
  }

  _getWeatherNow(data, time) {
    return data.filter(function (item) {
      return item.time === time;
    });
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
    const harmonieRequest = this._prepareRequest('weatherHarmonie', this._getHarmonieParams(this.weatherLocation));
    const hirlamRequest = this._prepareRequest('weatherHirlam', this._getHirlamParams(this.weatherLocation));

    Promise.all([harmonieRequest.completes, hirlamRequest.completes])
      .then((values) => {
        this._sendNotification(
          this._parseLocationGeoid(values[0].response),
          parseLocationName(values[0].response)
        );
        
        const harmonieResponse = this._harmonieResponse(values[0].response);
        const hirlamResponse = this._hirlamResponse(values[1].response);

        this.forecastData = this._combineDatas(harmonieResponse, hirlamResponse);
        this.weatherNowData = this._getWeatherNow(this.forecastData, this._timeNow())[0];
      })
      .catch(rejected => {
      
          raiseEvent(this, 'forecast-data.fetch-error', {text: 'Virhe haettaessa ennustetietoja'});
          console.log('error ' + rejected.stack);
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

  _parseWeatherNow(temperature, symbols){
    const temperatureRaw = value(temperature[0].children[1]);
    
    const symbol = Math.round(value(symbols[0].children[1]));

    const weatherNow = {
      temperature: temperatureRaw,
      symbol: symbol
    };

    return weatherNow;
  }

  _place (location) {
    return location.place; 
  }

  _sendNotification(geoid, name) {
    const details = {
      location: {
        geoid: geoid,
        name: name
      }
    };

    raiseEvent(this, 'forecast-data.new-place', details);
  }


  _timeNow(){
    let timeNow = new Date();

    timeNow.setMinutes(timeNow.getMinutes() + 30);
    timeNow.setMinutes(0,0,0);

    return timeNow.toISOString().split('.')[0]+"Z";
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
