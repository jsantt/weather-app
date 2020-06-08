import { css, html, LitElement } from 'lit-element';

import './time-now.js';
import '../weather-symbol.js';
import './weather-symbol-name.js';
import '../wind-icon.js';

class ForecastHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--color-primary);
        background: var(--header-footer-gradient);

        padding-bottom: var(--header-background-expand);
      }

      .visually-hidden {
        position: absolute !important;
        clip: rect(1px, 1px, 1px, 1px);
        padding: 0 !important;
        border: 0 !important;
        height: 1px !important;
        width: 1px !important;
        overflow: hidden;
      }

      .header {
        display: grid;
        grid-template-columns: 2.75rem 1fr 1fr 2.75rem;
        grid-template-rows: 2rem 3rem 3rem 3.5rem;
        grid-template-areas:
          'left empty empty aside'
          'left place place aside'
          'left temp  icon  aside'
          'left text  text  aside ';

        align-items: center;
      }

      .left {
        grid-area: left;
        height: 100%;
        padding-top: 1rem;
      }

      weather-symbol {
        grid-area: icon;
        margin: -1rem 0 -1.5rem 0;
      }

      .place {
        text-align: center;
        display: flex;
        justify-content: center;
        margin-left: 1.8rem;
      }

      h2 {
        grid-area: place;
      }

      aside {
        grid-area: aside;
        height: 100%;
        padding-top: 1.6rem;
        opacity: 0.8;
      }

      .aside-item {
        font-size: var(--font-size-xsmall);

        text-align: center;
      }
      .aside-item + .aside-item {
        padding-top: 0.25rem;
      }

      .aside-item.selected {
        background-color: #f5f5f529;
      }

      .aside-icon:hover {
        transform: scale(1.1);
      }

      .item-text {
        margin-top: -0.3rem;
      }
      .item-text--wind {
        margin-top: -0.5rem;
      }

      .location {
        color: var(--color-black);
        font-size: 1.563rem;
      }

      .temperature {
        grid-area: temp;
        font-size: var(--font-size-xxxlarge);
        line-height: 1.15;
        margin: 0 0 0 auto;
      }

      .degree {
        font-size: var(--font-size-large);
        vertical-align: top;
      }

      .feelsLikeValue {
        font-size: 20px;
        font-weight: 900;
      }
      #wind {
        padding-left: 0.25rem;
      }

      weather-symbol-name {
        grid-area: text;
        text-align: center;
      }
    `;
  }
  render() {
    return html`
      <header>
        <div class="header">
          <h3 class="visually-hidden">sää nyt</h3>
          <section class="left"></section>
          <div class="circle"></div>
          <h2 class="place">
            <location-selector
              .loading="${this.loading}"
              .place="${this.place}"
            >
            </location-selector>
          </h2>

          <div class="temperature">
            ${this._round(this.temperature)}
            <span class="degree">°C</span>
          </div>

          <weather-symbol symbol-id="${this.symbol}" large="true">
          </weather-symbol>

          <weather-symbol-name symbol-id="${this.symbol}">
          </weather-symbol-name>

          <aside>
            <div
              id="feelsLike"
              @click="${this._toggleFeelsLike}"
              class="feelsLike aside-item"
            >
              <svg
                class="aside-icon"
                viewBox="-4 -4 40 40"
                width="32"
                height="32"
              >
                <ellipse
                  class="body"
                  ry="15.1"
                  rx="14.9"
                  cy="29"
                  cx="15.9"
                  stroke="#000"
                  fill="#fff"
                />
                <ellipse
                  class="head"
                  stroke="#000"
                  ry="7.3"
                  rx="7.5"
                  cy="8.2"
                  cx="16"
                  fill="#ffcdd2"
                />
                <text text-anchor="middle" x="15" y="34" class="feelsLikeValue">
                  ${this.feelsLike}
                </text>
              </svg>
              <div class="item-text">tuntuu</div>
            </div>

            <div id="wind" class="wind aside-item" @click="${this._toggleWind}">
              <wind-icon
                .degrees="${this.windDirection}"
                large
                .windSpeed="${this.wind}"
                .windGustSpeed="${this.windGust}"
              >
              </wind-icon>
              <div class="item-text item-text--wind">tuuli</div>
            </div>
          </aside>
        </div>
        <time-now update-time="${this._locationChanged}"></time-now>
      </header>
    `;
  }

  static get is() {
    return 'forecast-header';
  }

  static get properties() {
    return {
      feelsLike: { type: Number, reflect: true },
      loading: { type: Boolean, reflect: true },
      place: { type: Object, reflect: true },

      symbol: { type: Number, reflect: true },
      temperature: { type: Number, reflect: true },

      wind: { type: Number, reflect: true },
      windDirection: { type: Number, reflect: true },
      windGust: { type: Number, reflect: true },

      _locationChanged: { type: Boolean, reflect: true },
    };
  }

  _toggleFeelsLike() {
    this.shadowRoot.querySelector('#feelsLike').classList.toggle('selected');

    var toggleFeelsLike = new CustomEvent('forecast-header.toggle-feels-like', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(toggleFeelsLike);

    //this._deselectWind();
  }

  _toggleWind() {
    this.shadowRoot.querySelector('#wind').classList.toggle('selected');

    var toggleWind = new CustomEvent('forecast-header.toggle-wind', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(toggleWind);

    //this._deselectFeelsLike();
  }

  _deselectWind() {
    const windSelected = this.shadowRoot
      .querySelector('#wind')
      .classList.contains('selected');

    if (windSelected) {
      this.shadowRoot.querySelector('#wind').classList.remove('selected');
      var toggleWind = new CustomEvent('forecast-header.toggle-wind', {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(toggleWind);
    }
  }
  _deselectFeelsLike() {
    const feelsSelected = this.shadowRoot
      .querySelector('#feelsLike')
      .classList.contains('selected');

    if (feelsSelected) {
      this.shadowRoot.querySelector('#feelsLike').classList.remove('selected');
      var toggleFeelsLike = new CustomEvent(
        'forecast-header.toggle-feels-like',
        { bubbles: true, composed: true }
      );
      this.dispatchEvent(toggleFeelsLike);
    }
  }

  _round(value) {
    if (Number.isNaN(value)) {
      return '';
    }

    return Math.round(value);
  }
}

window.customElements.define(ForecastHeader.is, ForecastHeader);
