import { css, html, LitElement } from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';

class WeatherSymbolSmall extends LitElement {
  static get is() {
    return 'weather-symbol-small';
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .symbol {
        --iron-icon-width: var(--width, 15px);
        --iron-icon-height: var(--height, 15px);
        z-index: 20;
      }
    `;
  }

  render() {
    return html`<iron-icon
      .icon="${'weather-symbol-small-icons:weatherSymbol' + this.symbolId}"
    ></iron-icon> `;
  }

  static get properties() {
    return {
      symbolId: {
        type: Number,
        reflect: true,
      },
    };
  }
}

window.customElements.define(WeatherSymbolSmall.is, WeatherSymbolSmall);
