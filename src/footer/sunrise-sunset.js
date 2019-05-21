import { html, LitElement } from 'lit-element';

import 'suncalc';

class SunriseSunset extends LitElement {
  static get is() { return 'sunrise-sunset'; }
  
  render() {
      return undefined;
    return html`Auringon nousu ${this._sunrise}<br>
        Auringon lasku ${this._sunset}`;
  }

  static get properties() {
    return {
        weatherLocation: {type: Object},
        _sunset: { type: String },
        _sunrise: { type: String }
    };
  }

  updated() {
    if(this.weatherLocation) {
        const parts = this.weatherLocation.coordinates.split(',');

        console.log(parts[0], parts[1]);

        _updateSunsetSunrise(parts[0], parts[1]);
    }
  }

  _updateSunsetSunrise() {
      const times = SunCalc.getTimes(new Date(), this.latitude, this.longitude);
      this._sunrise = this._formatTime(times.sunrise);
      this._sunset = this._formatTime(times.sunset);
  }

  _formatTime(time) {
    const minutes = time.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return time.getHours() + '.' + fullMinutes;
  }
}
window.customElements.define(SunriseSunset.is, SunriseSunset);
