import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class WindSpeed extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          color: var(--color-blue-800);
        }
        svg {
          fill: var(--color-blue-700);
        }
      </style>
      <template is="dom-repeat" items="[[_arrayForRepeater(windRating)]]">
        <svg class="wind-icon" width="14" height="14" viewBox="0 0 512 512">
          <g>
            <g>
              <path
                d="M287.64,94.921c-31.721,0-57.528,25.807-57.528,57.528h34.517c0-12.688,10.323-23.011,23.011-23.011
                c12.688,0,23.011,10.323,23.011,23.011c0,12.688-10.323,23.011-23.011,23.011H46.022v34.517H287.64
                c31.721,0,57.528-25.807,57.528-57.528C345.169,120.728,319.361,94.921,287.64,94.921z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M431.461,106.427c-34.893,0-63.281,28.388-63.281,63.281c0,25.377,20.646,46.022,46.022,46.022
                c25.377,0,46.022-20.646,46.022-46.022h-34.517c0,6.344-5.161,11.506-11.506,11.506c-6.344,0-11.506-5.161-11.506-11.506
                c0-15.861,12.904-28.764,28.764-28.764c25.377,0,46.022,20.646,46.022,46.022c0,25.377-20.646,46.022-46.022,46.022H0v34.517
                h431.461c44.409,0,80.539-36.13,80.539-80.539C512,142.557,475.87,106.427,431.461,106.427z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M345.169,290.517H46.022v34.517h299.146c15.861,0,28.764,12.904,28.764,28.764c0,15.861-12.904,28.764-28.764,28.764
                c-15.86,0-28.764-12.904-28.764-28.764h-34.517c0,34.893,28.388,63.281,63.281,63.281c34.893,0,63.281-28.388,63.281-63.281
                C408.449,318.905,380.062,290.517,345.169,290.517z"
              />
            </g>
          </g>
        </svg>
      </template>
      [[windDescription]]
    `;
  }

  static get is() {
    return "wind-speed";
  }

  static get properties() {
    return {
      windDescription: {
        type: String
      },
      windRating: {
        type: Array
      }
    };
  }

  _arrayForRepeater(windRating) {
    return new Array(windRating).fill(1);
  }
}

window.customElements.define(WindSpeed.is, WindSpeed);
