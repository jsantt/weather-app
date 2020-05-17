import { css, html, LitElement } from 'lit-element';

import '@polymer/iron-icon/iron-icon.js';

class iosAddToHomescreen extends LitElement {
  static get is() {
    return 'ios-add-to-homescreen';
  }

  static get properties() {
    return {
      forceShow: { type: Boolean },
      _deferredPrompt: { type: Object },
      _iosInstructionsVisible: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.forceShow = false;
    this._floating = true;

    window.addEventListener('beforeinstallprompt', (event) => {
      this._deferredPrompt = event;
    });
  }

  static get styles() {
    return css`
      <style>
        :host {
          display: block;
        }

        ::slotted(button) {
          color: var(--color-white) !important;
        }

        button{
          all: unset;
          box-sizing: border-box;
          background-color: var(--color-blue-500);
          border-radius: 4px;
          color: var(--color-white);
          
          display: flex;
          align-items: center;
          justify-content: center;
          
          font-weight: 700;
          text-align: center;
          text-transform: uppercase;
          
          padding: 1rem;
          width: 100%;
        }

        .notification {
          border-radius: 4px;

          background-color: var(--color-primary);
          color: var(--color-white);

          margin: var(--space-m) 0;
          padding: var(--space-l);
        }

        .sun {
          --iron-icon-width: 32px;
          --iron-icon-height: 32px;

          padding: 0 var(--space-l);
        }

        .sun--hidden {
          visibility: hidden;
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
            <section id="install-prompt">
              <button @click="${this._install}">
                <iron-icon
                  class="sun"
                  icon="weather-symbol-icons:weatherSymbol1"
                ></iron-icon>
                <div
                  color="white"
                  style="color:white !important; font-weight:900 !important"
                >
                  ASENNA SOVELLUS
                </div>
                <iron-icon
                  class="sun sun--hidden"
                  icon="weather-symbol-icons:weatherSymbol1"
                ></iron-icon>
              </button>

              ${this._iosInstructionsVisible === true
                ? html`
              <div class="notification">

              <div class="text">
                Tykkäätkö? Napauta

                <iron-icon
                  class="share"
                  icon="weather-icons:iosShare"
                ></iron-icon
                >, scrollaa alas ja lisää kotivalikkoon
              </div>
            </div>
            </section>`
                : ''}
            </section>
          `
        : ''}
    `;
  }

  _install() {
    const promptEvent = this._deferredPrompt;

    if (this._showIosInstructions() === true) {
      this._iosInstructionsVisible = !this._iosInstructionsVisible;
    } else if (promptEvent != null) {
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      promptEvent.userChoice.then((result) => {
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        this._deferredPrompt = null;

        // Hide the install button.
      });
    }
  }

  _showPrompt() {
    // if launched as app
    if (navigator.standalone) {
      return false;
    }

    if (this.forceShow === true || window.DeferredPrompt != null) {
      return true;
    }

    return this._showIosInstructions();
  }

  _showIosInstructions() {
    return this._isPortableApple() === true && this._isSafari() === true;
  }

  _isPortableApple() {
    return (isApple = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform));
  }

  _isSafari() {
    const userAgent = window.navigator.userAgent;
    return (
      !/CriOS/.test(userAgent) &&
      !/FxiOS/.test(userAgent) &&
      !/OPiOS/.test(userAgent) &&
      !/mercury/.test(userAgent)
    );
  }
}

window.customElements.define(iosAddToHomescreen.is, iosAddToHomescreen);
