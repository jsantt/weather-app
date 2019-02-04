import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


class RainHelper extends PolymerElement {
  
  static get is() { return 'rain-helper'; }

  constructor() {
    super();
  }

  totalRain(weatherDay) {
    weatherDay.reduce((previous, item) => {
      return previous.rain + item.rain;
    }, 0)
  }
}

window.customElements.define(RainHelper.is, RainHelper);
