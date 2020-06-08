import { css, html, LitElement } from 'lit-element';
import '../error-notification';
import '../header/weather-symbol-wawa.js';

class WeatherStation extends LitElement {
  static get is() {
    return 'weather-station';
  }

  static get styles() {
    return css`
      :host {
        background-color: #b7e1cd;
        color: var(--color-green-800);

        display: block;
      }

      h1,
      h2,
      h3 {
        font-weight: 500;
        margin: 0;

        padding: 0;
      }

      h1 {
        font-size: var(--font-size-medium);
        line-height: 1;
      }

      .beta {
        font-size: var(--font-size-small);
        font-style: italic;
        vertical-align: super;
      }

      h2 {
        font-size: var(--font-size-xlarge);
        line-height: 1.1;
      }
      h3 {
        font-size: var(--font-size-small);
        line-height: 1.5;
      }

      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;

        align-items: center;
        justify-items: center;

        padding-top: 1.4rem;
        text-align: center;
      }
      .item {
        padding: 1rem 0;
      }

      .temperature {
        justify-self: stretch;
        font-size: var(--font-size-xxlarge);
        font-weight: 900;
        grid-column: 1 / span 2;

        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
      }

      .place {
        grid-column: 1 / span 2;
        font-size: var(--font-size-medium);
      }

      .degree {
        font-size: var(--font-size-large);
        vertical-align: super;
      }
      .textual {
        font-size: var(--font-size-medium);
      }
      .rainDetails {
        grid-column: 1 / span 2;
      }
      .value {
        font-size: var(--font-size-large);
        font-weight: 900;
      }
      .windExplanation {
        margin-top: -0.26rem;
      }

      .description {
        font-size: var(--font-size-medium);
        padding: 0 1rem;
      }

      .footer {
        background-color: #9ad5b9;
        margin-top: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0.5rem;
      }
      a {
        color: var(--color-white);
      }
    `;
  }

  render() {
    if (this.observationData === undefined) {
      return html``;
    }

    return html`
      ${this.observationError
        ? html`
            <error-notification
              error-text="Sääasemalle ei valitettavasti saatu yhteyttä"
            >
            </error-notification>
          `
        : html`
            <div class="content">
              <div class="place">
                ${this.observationData.weatherStation}
              </div>
              <div class="item temperature">
                ${this.observationData.temperature
                  ? html`
                      <div>
                        <span>${this.observationData.temperature}°C</span>
                      </div>
                    `
                  : ``}
                <weather-symbol-wawa
                  class="value description"
                  wawa-id="${this.observationData.weatherCode}"
                  cloudiness="${this.observationData.cloudiness}"
                >
                </weather-symbol-wawa>
              </div>

              ${this.observationData.rainExplanation
                ? html`
                    <div class="item">
                      <div class="value">
                        ${this.observationData.rainExplanation}mm/h
                      </div>
                      <div class="explanation">sateen rankkuus</div>
                      <div></div>
                    </div>
                  `
                : ``}
              ${this.observationData.rain
                ? html`
                    <div>
                      <div class="value">${this.observationData.rain}</div>
                      <div class="explanation">mm sadetta / edeltävä tunti</div>
                    </div>
                  `
                : ``}
              ${this.observationData.wind
                ? html`
                    <div class="item">
                      <wind-icon
                        degrees="${this.observationData.windDirection}"
                        large
                        windSpeed="${this.observationData.wind}"
                        windGustSpeed="${this.observationData.windGust}"
                      >
                      </wind-icon>
                      <div class="explanation windExplanation">
                        10 min keskituuli ja puuskat
                      </div>
                    </div>
                  `
                : ``}
              ${this.observationData.humidity
                ? html`
                    <div class="item">
                      <div class="value">${this.observationData.humidity}%</div>
                      <div class="explanation">ilmankosteus</div>
                    </div>
                  `
                : ``}
              ${this.observationData.pressure
                ? html`
                    <div class="item">
                      <div class="value">
                        ${this.observationData.pressure} hPa
                      </div>
                      <div class="explanation">ilmanpaine</div>
                    </div>
                  `
                : ``}
              ${this.observationData.visibility
                ? html`
                    <div class="item">
                      <div class="value">
                        ${this.observationData.visibility}m
                      </div>
                      <div class="explanation">näkyvyys</div>
                    </div>
                  `
                : ``}
              ${this.observationData.dewPoint
                ? html`
                    <div class="item">
                      <div class="value">
                        ${this.observationData.dewPoint}°C
                      </div>
                      <div class="explanation">kastepiste</div>
                    </div>
                  `
                : ``}
              ${this.observationData.cloudiness
                ? html`
                    <div class="item">
                      <div class="value">
                        ${this.observationData.cloudiness} / 8
                      </div>
                      <div class="explanation">pilvisyys</div>
                    </div>
                  `
                : ``}
              ${this._snow(this.observationData.snow)
                ? html`
                    <div class="item">
                      Lumen syvyys: ${this.observationData.snow} cm
                    </div>
                  `
                : ``}
            </div>
          `}
      <div class="footer">
        Kello ${this._formatTime(this.observationData.time)} &nbsp;
        <a href="${this._googleMapsURl(this.observationData.latLon)}"
          >sijainti kartalla</a
        >
      </div>
    `;
  }

  static get properties() {
    return {
      observationData: {
        type: Object,
      },
      observationError: {
        type: Boolean,
      },
    };
  }

  ready() {
    super.ready();
    console.log(this._distance(60, 20, 60, 21));
  }

  _formatTime(time) {
    const parsedTime = new Date(time);

    const minutes = parsedTime.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return parsedTime.getHours() + '.' + fullMinutes;
  }

  _googleMapsURl(latitudeLongitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitudeLongitude}&zoom=12`;
  }

  _snow(centimeters) {
    return centimeters > -1;
  }

  /* Formula from https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates*/

  _distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = this._toRadian(lat2 - lat1);
    const dLon = this._toRadian(lon2 - lon1);
    const latitude1 = this._toRadian(lat1);
    const latitude2 = this._toRadian(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(latitude1) *
        Math.cos(latitude2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  _toRadian(degrees) {
    return (degrees * Math.PI) / 180;
  }
}

window.customElements.define(WeatherStation.is, WeatherStation);
