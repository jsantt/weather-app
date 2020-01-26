import { css, html, LitElement } from "lit-element";

import "@polymer/iron-icon/iron-icon.js";

class iosAddToHomescreen extends LitElement {
  static get is() {
    return "ios-add-to-homescreen";
  }

  static get properties() {
    return {
      forceShow: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.forceShow = false;
    this._floating = true;
  }

  static get styles() {
    return css`
      <style>
        :host {
          display: block;
        }

        .notification {
          display: flex;
          align-items: center;
          justify-content: space-around;

          background-color: var(--color-primary);
          color: var(--color-white);

          margin: var(--space-m) 0;
        }

        .sun {
          --iron-icon-width: 32px;
          --iron-icon-height: 32px;

          padding: 0 var(--space-l);
        }

        .text {
          padding: var(--space-l) var(--space-l) var(--space-l) 0;
        }

        .share {
          --iron-icon-stroke-color: var(--color-white);
          --iron-icon-fill-color: var(--color-white);
        }
      </style>
      `;
  }

  render() {
    return html`
      ${this._showPrompt() === true
        ? html`
            <div class="notification">
              <iron-icon
                class="sun"
                icon="weather-symbol-icons:weatherSymbol1"
              ></iron-icon>

              <div class="text">
                Tykkäätkö? Napauta

                <iron-icon
                  class="share"
                  icon="weather-icons:iosShare"
                ></iron-icon
                >, scrollaa alas ja lisää kotivalikkoon
              </div>
            </div>
          `
        : ""}
    `;
  }

  _showPrompt() {
    // if launched as app
    if (navigator.standalone) {
      return false;
    }

    const isApple = ["iPhone", "iPad", "iPod"].includes(navigator.platform);

    return isApple || this.forceShow;
  }
}

window.customElements.define(iosAddToHomescreen.is, iosAddToHomescreen);
