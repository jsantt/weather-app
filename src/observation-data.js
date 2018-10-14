import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import { getByAttributeValue, getTime, getTimeAndValuePairs, getValue, parseLocationName, raiseEvent } from './xml-parser.js';


/** 
 * Observations are fetched from the nearest observation station using area name, because 
 * there is no support for coordinates. New data is available every 10 minutes
 */
class ObservationData extends PolymerElement {
    static get is() { return 'observation-data'; }
    
    static get template() {
      return html`
          <iron-ajax 
            id="weather" 
            url="https://opendata.fmi.fi/wfs" 
            handle-as="document" 
            timeout="8000"></iron-ajax>
      `;
    }

    static get properties() {
      return {
        fetchError: {
          type: Boolean,
          notify: true
        },
        // location object, e.g {geoid: "7521614", name: "Kattilalaakso"}
        place: {
          type: Object,
          observer: '_newPlace'
        },
        // data served out from the component
        observationData: {
          type: Object,
          notify: true
        },
      };
    }

    // Lifecycle functions

    ready() {
      super.ready();
    }
    
    // other functions alphabetically

    _getParams(geoid){

      let params = 
      {
        "request":"getFeature", 
        "storedquery_id":"fmi::observations::weather::timevaluepair",
        "geoid": geoid,
        "maxlocations": 1,
        "starttime": this._roundDownToFullMinutes(-12), // get the latest data only
        "endtime": this._roundDownToFullMinutes(0) // get the latest data only
      }

      return params;
    }

    _getObservations(data) {
      // TODO: pass in existing time now
      let timeNow = new Date();
      timeNow.setMinutes(0,0,0);
      
      const timeISO = timeNow.toISOString().split('.')[0]+"Z";
      return timeISO;
    }
    
    /**
     * Response example
     * 
     * <wfs:FeatureCollection>
     *   <wfs:member>
     *     <omso:PointTimeSeriesObservation>
     *       <om:phenomenonTime>...
     *       <om:resultTime>...
     *       <gml:name codeSpace="http://xml.fmi.fi/namespace/locationcode/name">
     *         Helsinki Kaisaniemi
     *       </gml:name>...
     *       <om:result>
     *         <wml2:MeasurementTimeseries gml:id="obs-obs-1-1-t2m">                         
     *           <wml2:point>
     *             <wml2:MeasurementTVP> 
     *               <wml2:time>2018-04-29T07:40:00Z</wml2:time>
     *	              <wml2:value>6.4</wml2:value>...                          
     *           <wml2:point>
     *             <wml2:MeasurementTVP> 
     *               <wml2:time>2018-04-29T07:50:00Z</wml2:time>
     *	              <wml2:value>6.4</wml2:value>
     * 
     *   wd_10min = tuulen suunta
     *   wawa = säätila
     *   ws_10min = tuulen nopeus
     *   wg_10min = puuskatuuli
     *   p_sea = ilmanpaine
     *   rh = ilmankosteus
     *   t2m = lämpötila
     *   r_1h = 1h sademäärä
     *   ri_10min = sateen rankkuus
     *   snow_aws = lumen syvyys niiltä asemilta jossa se on
     * 
     * And it is converted to the following JSON and stored into this.observationData 
     * 
     * {
     *   humidity: 98
     *   pressure: 1014.8
     *   rain: NaN
     *   rainExplanation: 0
     *   snow: NaN
     *   temperature: 1.3
     *   time: "2018-10-07T19:40:00Z"
     *   weatherCode: 0
     *   weatherStation: "Espoo Tapiola"
     *   wind: 2.4
     *   windDirection: 314
     * }
     *   
     */
     _handleResponse(request) {

      let observations = this._parseObservations(request.response);
    
      this.observationData = {
        weatherStation: parseLocationName(request.response),
        time: getTime(observations.temperature),
        humidity: getValue(observations.humidity),
        pressure: getValue(observations.pressure),
        rain: getValue(observations.rain),
        rainExplanation: getValue(observations.rainExplanation),
        snow: getValue(observations.snow),
        temperature: parseFloat(getValue(observations.temperature)),
        weatherCode:  getValue(observations.weatherCode),
        wind: parseFloat(getValue(observations.wind)),
        windDirection: parseFloat(getValue(observations.windDirection)),
        windGust: parseFloat(getValue(observations.windGust))
      }
    }

    _parseObservations(response) {

      const timeSeries = response.getElementsByTagName('wml2:MeasurementTimeseries');

      let observation = {};

      //measurementTVP
      observation.humidity = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-rh', 'humidity')[0];
      observation.pressure = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-p_sea', 'pressure')[0];
      observation.rain = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-r_1h', 'rain')[0];
      observation.rainExplanation = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-ri_10min', 'rainExplanation')[0];
      observation.snow = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-snow_aws', 'snow')[0];
      observation.temperature = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-t2m', 'temperature')[0];
      observation.weatherCode = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-wawa', 'weatherCode')[0];
      observation.wind = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-ws_10min', 'wind')[0];
      observation.windDirection = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-wd_10min', 'windDirection')[0];
      observation.windGust = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-wg_10min', 'windGust')[0];

      return observation;
    }

    _newPlace() {
      this.fetchError = false;
      this.$.weather.params = this._getParams(this.place.geoid);
      
      this.$.weather.generateRequest().completes
        .then(req => {
          this._handleResponse(req);
        })
        .catch(rejected => { 
          this.fetchError = true;
          raiseEvent(this, 'observation-data.fetch-error', {text: 'Havaintoja ei saatavilla'});
          console.log('error ' + rejected.stack);
        });
    }

    _roundDownToFullMinutes(minutes) {
      
      let timeNow = new Date();

      timeNow.setMinutes(timeNow.getMinutes() + minutes);
      timeNow.setSeconds(0,0);
      
      return timeNow.toISOString();
    }
  }

window.customElements.define(ObservationData.is, ObservationData);
