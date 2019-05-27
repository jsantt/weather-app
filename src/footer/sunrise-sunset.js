import { html, LitElement } from 'lit-element';

import 'suncalc';

class SunriseSunset extends LitElement {
  static get is() { return 'sunrise-sunset'; }
  
  render() {
    return html`
        ${this._sunrise} aurinko nousee<br>
        ${this._sunset} aurinko laskee<br><br>
        ${this._solarNoon} aurinko korkeimmillaan<br>
        ${this._darkestNight} pimeintä (aurinko matalimmillaan)<br>`
  }

  static get properties() {
    return {
        coordinates: { type: String },
        _sunrise: { type: String },
        _sunset: { type: String },
        _solarNoon: { type: String },
        _darkestNight: { type: String }
    };
  }

  updated() {
    if(this.coordinates !== undefined) {
        this._updateSunsetSunrise();
    }
  }

  _updateSunsetSunrise() {
      const coordinatesArray = this.coordinates.split(',');
      const latitude = coordinatesArray[0];
      const longitude = coordinatesArray[1];

      const times = SunCalc.getTimes(new Date(), latitude, longitude);
      console.log(times);
      this._sunrise = this._formatTime(times.sunrise);
      this._sunset = this._formatTime(times.sunset);
      this._solarNoon = this._formatTime(times.solarNoon);
      this._darkestNight = this._formatTime(times.nadir);
  }

  _formatTime(time) {
    const minutes = time.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return time.getHours() + '.' + fullMinutes;
  }
}
window.customElements.define(SunriseSunset.is, SunriseSunset);
