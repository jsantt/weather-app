import { css, html, LitElement } from "lit-element";

import "../header/weather-symbol-wawa.js";

class BottomMenu extends LitElement {
  static get is() {
    return "bottom-menu";
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-around;
        align-items: center;

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: var(--color-white);
        color: var(--color-blue-800);

        padding: 0.25rem;
        opacity: 0.95;
        line-height: 1;
        box-shadow: var(--notification-shadow);

        z-index: 100;
      }

      a {
        color: var(--color-blue-800);
      }

      .temperature,
      .place {
        font-weight: 700;
      }
      .place {
        text-decoration: underline;
        cursor: pointer;
      }
      .item {
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      ${this.observationData !== undefined
        ? html`
            <div class="item">
              <div class="place">
                <a @click="${() => this._toggleObservation()}"
                  >${this.observationData.weatherStation}</a
                >
              </div>
              <div>
                klo ${this._hoursAndMinutes(this.observationData.time)}
              </div>
            </div>
            <div class="item">
              <div class="temperature">
                ${this.observationData.temperature}°C
              </div>
              <weather-symbol-wawa
                wawa-id="${this.observationData.weatherCode}"
                cloudiness="${this.observationData.cloudiness}"
              >
              </weather-symbol-wawa>
            </div>
          `
        : ""}

      <slot></slot>
    `;
  }

  static get properties() {
    return {
      coordinates: { type: String },
      observationData: { type: Object }
    };
  }

  _hoursAndMinutes(time) {
    const date = new Date(time);
    const minutes = date.getMinutes();
    const fullMinutes = minutes < 10 ? "0" + minutes : minutes;

    return date.getHours() + "." + fullMinutes;
  }

  _toggleObservation() {
    const event = new CustomEvent("forecast-header.toggle-observation", {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}
window.customElements.define(BottomMenu.is, BottomMenu);
