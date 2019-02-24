import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


class RainHelper extends PolymerElement {
  
  static get is() { return 'rain-helper'; }

  /**
   * Sleet is counted as rain
   */
  totalRain(weatherDay) {
    const RAIN_SYMBOLS = [22, 23, 31, 32, 33, 63, 64, 72, 73, 81, 82, 83];

    let rain;
    console.log("day");
    
    const total = weatherDay.reduce((previous, item) => {
      rain = 0;

      if(item.rain > 0.0 && RAIN_SYMBOLS.includes(item.symbol)){
        rain = item.rain || 0;
      }
      
      return previous + rain;
    }, 0.0)

    return this._round(total);
  }

  totalSnow(weatherDay) {
    const SNOW_SYMBOLS = [41, 42, 43, 51, 52, 53];

    let snow;
    
    const total = weatherDay.reduce((previous, item) => {
      snow = 0;
      
      if(SNOW_SYMBOLS.includes(item.symbol)) {
        snow = (0.016 * Math.pow(item.temperature, 2) + 1) * item.rain;
        console.log(item.rain, item.temperature, snow);
      }
  
      return previous + snow;
    }, 0.0) 
    
    return this._round(total);
  }

  _round(total) {

    let roundedTotal;
    if(0 < total && total < 0.5) {
      roundedTotal = "<1";
    }
    else{
      roundedTotal = total === 0 ? "" : Math.round(total)
    }
    
    return roundedTotal;
  }
  
}

window.customElements.define(RainHelper.is, RainHelper);
