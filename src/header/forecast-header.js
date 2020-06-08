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
        /*background: radial-gradient(circle, #20639b 3%, #173f5f 96%);*/
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
            <location-selector loading="${this.loading}" place="${this.place}">
            </location-selector>
          </h2>

          <div class="temperature">
            ${this._round(this.weatherNowData.temperature)}
            <span class="degree">°C</span>
          </div>

          <weather-symbol
            symbol-id="${this.weatherNowData.symbol}"
            large="true"
          >
          </weather-symbol>

          <weather-symbol-name symbol-id="${this.weatherNowData.symbol}">
          </weather-symbol-name>

          <aside>
            <div
              id="feelsLike"
              on-click="_toggleFeelsLike"
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
                  ${this.weatherNowData.feelsLike}
                </text>
              </svg>
              <div class="item-text">tuntuu</div>
            </div>

            <div id="wind" class="wind aside-item" on-click="_toggleWind">
              <wind-icon
                degrees="${this.weatherNowData.windDirection}"
                large
                windSpeed="${this.weatherNowData.wind}"
                windGustSpeed="${this.weatherNowData.windGust}"
              >
              </wind-icon>
              <div class="item-text item-text--wind">tuuli</div>
            </div>

            <!--div
          id="observation"
          class="observation aside-item"
          on-click="_toggleObservation">
          
          <svg
            class="aside-icon"
            width="32px"
            height="32px"
            viewBox="0 0 32 32">

            <path stroke="#000" stroke-width="1" fill="#fff" d="m19.27125,18.08333l0,-13.16322c0,-1.70222 -1.38385,-3.08056 -3.08423,-3.08056c-1.70406,0 -3.0824,1.37834 -3.0824,3.08056l0,13.05924c-1.93777,1.06182 -3.25354,3.12013 -3.25354,5.48483c0,3.45229 2.799,6.25037 6.25037,6.25037c3.4532,0 6.25036,-2.79808 6.25036,-6.25037c0.00092,-2.29385 -1.23848,-4.29511 -3.08056,-5.38085z"/>
            <rect stroke="#000" stroke-width="1" fill="#ffcdd2" height="11.5625" width="1.4375" y="8.559082" x="15.46875" />
            <ellipse stroke="#000" stroke-width="1" fill="#ffcdd2" ry="3.53125" rx="3.53125" id="svg_7" cy="23.402832" cx="16.0625"/>
          
          </svg>
          <div class="item-text">havainto</div>
        </div-->
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
      feelsLike: {
        type: Number,
        reflect: true,
      },
      loading: {
        type: Boolean,
        reflect: true,
      },
      _locationChanged: {
        type: Boolean,
        reflect: true,
      },
      place: {
        type: Object,
        reflect: true,
      },
      symbol: {
        type: Number,
        reflect: true,
      },
      temperature: {
        type: Number,
        reflect: true,
      },
      weatherNowData: {
        type: Object,
        reflect: true,
      },
      windDirection: { type: Number, reflect: true },
      windGust: { type: Number, reflect: true },
    };
  }

  /*toggleObservationHighlight() {
    this.shadowRoot.querySelector("#observation").classList.toggle("selected");
  }*/

  /*_getWeatherNow(data) {
    const time = this._nextIsoHour();

    if (data === undefined) {
      return;
    }

    const hourForecast = data.filter(function (item) {
      return item.time === time;
    })[0];

    this._locationChanged = !this._locationChanged;

    return hourForecast;
  }*/

  /*_toggleObservation() {
    const event = new CustomEvent('forecast-header.toggle-observation', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }*/

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

  _nextIsoHour() {
    let timeNow = new Date();

    timeNow.setHours(timeNow.getHours() + 1);
    timeNow.setMinutes(0, 0, 0);

    return timeNow.toISOString().split('.')[0] + 'Z';
  }

  _round(value) {
    if (value === undefined) {
      return '';
    }

    return Math.round(value);
  }
}

window.customElements.define(ForecastHeader.is, ForecastHeader);
