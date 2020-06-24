import { css, html, LitElement } from 'lit-element';

class ExternalLinks extends LitElement {
  static get is() {
    return 'external-links';
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 3rem 3rem;

        place-items: center;

        margin-right: 2rem;
      }
      div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
      }
    `;
  }

  render() {
    return html`
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <path
              d="M13.28,8.5l0.76,0.58l0.92-0.23L13,14.8V8.29L13.28,8.5z M9.03,8.86L11,14.8V8.29L10.72,8.5L9.96,9.09 L9.03,8.86z"
              opacity=".3"
            />
            <path
              d="M14.5,6.92L13,5.77V3.88V3.4c0-0.26,0.22-0.48,0.5-0.48c0.28,0,0.5,0.21,0.5,0.48V4h2V3.4C16,2.07,14.88,1,13.5,1 C12.12,1,11,2.07,11,3.4v0.48v1.89L9.5,6.92L6,6.07l5.05,15.25C11.2,21.77,11.6,22,12,22s0.8-0.23,0.95-0.69L18,6.07L14.5,6.92z M13.28,8.5l0.76,0.58l0.92-0.23L13,14.8V8.29L13.28,8.5z M9.96,9.09l0.76-0.58L11,8.29v6.51L9.03,8.86L9.96,9.09z"
            />
          </g>
        </svg>
        <a href="https://www.sataako.fi">
          sadetutka
        </a>
      </div>

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M7.6 7.6c-.47 2.34.03 4.78 1.39 6.83l5.45-5.45c-1.53-1.02-3.28-1.56-5.08-1.56-.6 0-1.19.06-1.76.18zM13.12 5c-.93 0-1.82.16-2.67.46 1.91.19 3.79.89 5.44 2.07l1.39-1.39C16.03 5.4 14.61 5 13.12 5zM5 13.12c0 1.49.4 2.91 1.14 4.15l1.39-1.39c-1.18-1.65-1.88-3.52-2.07-5.44-.3.86-.46 1.76-.46 2.68z"
            opacity=".3"
          />
          <path
            d="M13.126 14.56l1.428-1.428 6.442 6.442-1.43 1.428zM13.12 3c-2.58 0-5.16.98-7.14 2.95l-.01.01c-3.95 3.95-3.95 10.36 0 14.31l14.3-14.31C18.3 3.99 15.71 3 13.12 3zM6.14 17.27C5.4 16.03 5 14.61 5 13.12c0-.93.16-1.82.46-2.67.19 1.91.89 3.79 2.07 5.44l-1.39 1.38zm2.84-2.84C7.63 12.38 7.12 9.93 7.6 7.6c.58-.12 1.16-.18 1.75-.18 1.8 0 3.55.55 5.08 1.56l-5.45 5.45zm1.47-8.97c.85-.3 1.74-.46 2.67-.46 1.49 0 2.91.4 4.15 1.14l-1.39 1.39c-1.65-1.18-3.52-1.88-5.43-2.07z"
          />
        </svg>
        <a href="https://www.ilmatieteenlaitos.fi/uvi-ennuste">
          UV-indeksi
        </a>
      </div>

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M5 5v14h14V5H5zm4 12H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
            opacity=".3"
          />
          <path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"
          />
        </svg>
        <a href="https://www.ilmatieteenlaitos.fi/paikallissaa"> 10 vrk sää</a>
      </div>

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 4.02C7.6 4.02 4.02 7.6 4.02 12S7.6 19.98 12 19.98s7.98-3.58 7.98-7.98S16.4 4.02 12 4.02zM11.39 19v-5.5H8.25l4.5-8.5v5.5h3L11.39 19z"
            opacity=".3"
          />
          <path
            d="M12 2.02c-5.51 0-9.98 4.47-9.98 9.98s4.47 9.98 9.98 9.98 9.98-4.47 9.98-9.98S17.51 2.02 12 2.02zm0 17.96c-4.4 0-7.98-3.58-7.98-7.98S7.6 4.02 12 4.02 19.98 7.6 19.98 12 16.4 19.98 12 19.98zM12.75 5l-4.5 8.5h3.14V19l4.36-8.5h-3V5z"
          />
        </svg>
        <a
          href="https://www.nordicweather.net/ukkostutka.php?fi#8/60.297/24.120"
        >
          ukkostutka</a
        >
      </div>
    `;
  }
}
window.customElements.define(ExternalLinks.is, ExternalLinks);
