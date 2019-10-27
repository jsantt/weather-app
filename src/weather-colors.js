import { LitElement } from 'lit-element';

class WeatherColors extends LitElement {
  static get is() { return 'weather-colors'; }

  constructor() {
      super();

      this.colors= [
        rgb()
      ];
  }
}
window.customElements.define(WeatherColors.is, WeatherColors);
