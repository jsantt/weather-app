import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../wind-icon.js';


class WindNow extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

    </style>

  
    <wind-icon 
      class="windIcon" 
      on-click="_toggleWind" 
      degrees="[[windDirection]]" 
      large="" 
      round="" 
      wind-speed="[[wind]]">
    </wind-icon>
`;
  }

  static get is() { return 'wind-now'; }

  static get properties() {
    return {
      windDirection: {
        type: Number
      },
      windSpeed: {
        type: Number
      }
    };
  }

  ready() {
    super.ready();
  }

  _toggleWind() {
    var toggleWind = new CustomEvent('wind-now.toggle-wind', {bubbles: true, composed: true});
    this.dispatchEvent(toggleWind);
  }
}

window.customElements.define(WindNow.is, WindNow);
