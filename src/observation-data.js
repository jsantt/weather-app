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
            url="https://data.fmi.fi/fmi-apikey/412facb5-f1bc-44e7-88cc-dc9e08903e32/wfs" 
            params=[[_getParams(weatherLocation)]]
            handle-as="document" 
            timeout="8000"></iron-ajax>
      `;
    }

    static get properties() {
      return {
        place: {
          type: Number,
          observer: '_newPlace'
        },
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

    _getParams(location){

      let params = 
      {
        "request":"getFeature", 
        "storedquery_id":"fmi::observations::weather::timevaluepair",
        "geoid": location,
        "maxlocations": 1,
        "starttime": this._roundDownToFullMinutes(-12), // get the latest data only
        "endtime": this._roundDownToFullMinutes(0) // get the latest data only
      }

      return params;
    }

    _getObservations(data) {
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
     *    weatherStation: "Espoo Tapiola", 
     *    time: "2018-05-01T14:30:00Z", 
     *    temperature: "6.3", 
     *    wind: "3.8", 
     *    windDirection: "116.0"
     * }
     * 
     *   
     */
     _handleResponse(request) {

      let observations = this._parseObservations(request.response);
      
      this.observationData = {
        weatherStation: parseLocationName(request.response),
        time: getTime(observations.temperature),
        temperature: parseFloat(getValue(observations.temperature)),
        weatherCode:  getValue(observations.weatherCode),
        wind: parseFloat(getValue(observations.wind)),
        windDirection: parseFloat(getValue(observations.windDirection))
      }
    }

    _parseObservations(response) {

      const timeSeries = response.getElementsByTagName('wml2:MeasurementTimeseries');

      let observation = {};

      //measurementTVP
      observation.humidity = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-rh', 'humidity')[0];
      observation.temperature = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-t2m', 'temperature')[0];
      observation.weatherCode = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-wawa', 'weatherCode')[0];
      observation.wind = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-ws_10min', 'wind')[0];
      observation.windDirection = getTimeAndValuePairs(timeSeries, 'obs-obs-1-1-wd_10min', 'windDirection')[0];

      return observation;
    }

    _newPlace() {
      this.$.weather.params = this._getParams(this.place.location.geoid);
      
      this.$.weather.generateRequest().completes
        .then(req => {
          this._handleResponse(req);
        })
        .catch(rejected => {
          raiseEvent(this, 'observation-data.fetch-error', {text: 'Virhe haettaessa ennustetietoja'});
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
