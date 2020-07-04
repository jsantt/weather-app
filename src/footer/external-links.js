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
        grid-template-rows: 3rem;

        place-items: center;

        margin-right: 2rem;
      }
      div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
      }

      svg {
        fill: var(--color-blue-700);
      }

      a:link {
        color: var(--color-blue-500);
      }

      a:visited,
      a:hover {
        color: var(--color-blue-700);
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
            d="M5 5v14h14V5H5zm4 12H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
            opacity=".3"
          />
          <path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"
          />
        </svg>
        <a href="https://www.ilmatieteenlaitos.fi/paikallissaa"
          >10&nbsp;vrk&nbsp;sää</a
        >
      </div>
    `;
  }
}
window.customElements.define(ExternalLinks.is, ExternalLinks);
