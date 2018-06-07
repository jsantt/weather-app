import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../src/weather-symbol.js';
import '../src/weather-symbol-icons.js';
import '../src/weather-symbol-name.js';
/**
 * @customElement
 * @polymer
 */
class TestWeatherSymbol extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

    </style>
  
  <template is="dom-repeat" items="[[_symbol()]]" as="id">
      <weather-symbol symbol-id="[[id]]"></weather-symbol>
      <weather-symbol-name symbol-id="[[id]]"></weather-symbol-name>
      [[id]]
      <br><br>
  </template>
`;
  }

  static get is() { return 'test-weather-symbol'; }

  _symbol(){
    return [1,2,3,21,22,23,31,32,33,41,42,43,51,52,53,61,62,63,64,71,72,73,81,82,83,91,92];
  }
}

window.customElements.define(TestWeatherSymbol.is, TestWeatherSymbol);
