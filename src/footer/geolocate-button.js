import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class GeolocateButton extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --color-locate: var(--color-blue-300);

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          touch-action: none;
          user-select: none;

          position: fixed;
          left: 0px;
          right: 0px;
          bottom: 1rem;
          z-index: 101;
        }
        :host(:hover) {
          cursor: pointer;
        }
        svg {
          -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3));
          filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3));
          /* Similar syntax to box-shadow */
        }

        .locate-icon-shadow {
          fill: var(--color-white);
        }

        .locate-text {
          color: var(--color-red-800);
          font-size: var(--font-size-small);
          font-weight: 900;
          margin-top: -1.8rem;
          z-index: 1;
          margin-left: 0.2rem;
        }
      </style>
      <template is="dom-if" if="{{!hide}}">
        <svg
          on-click="_geolocate"
          width="72"
          height="72"
          viewbox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <title>paikanna</title>
            <ellipse
              stroke="#f5f5f5"
              stroke-width="3"
              fill="#fff"
              cx="15.94793"
              cy="17.3763"
              id="svg_1"
              rx="13.98955"
              ry="13.98955"
            />
            <path
              class="locate-icon"
              stroke-width="0"
              stroke="#fff"
              fill="#ed332b"
              d="m16.18757,0.12498c-3.69724,0 -6.68752,2.99028 -6.68752,6.68752c0,5.01564 6.68752,12.41967 6.68752,12.41967s6.68752,-7.40403 6.68752,-12.41967c0,-3.69724 -2.99028,-6.68752 -6.68752,-6.68752zm0,9.07591c-1.3184,0 -2.38839,-1.07 -2.38839,-2.38839s1.07,-2.38839 2.38839,-2.38839s2.38839,1.07 2.38839,2.38839s-1.07,2.38839 -2.38839,2.38839z"
            />
          </g>
        </svg>
        <div class="locate-text">paikanna</div>
      </template>
    `;
  }

  static get is() {
    return 'geolocate-button';
  }

  ready() {
    super.ready();
  }

  static get properties() {
    return {
      hide: {
        type: Boolean,
      },
    };
  }

  _geolocate() {
    this._dispatchEvent('location-selector.locate-started');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates =
            position.coords.latitude + ',' + position.coords.longitude;
          const url =
            position.coords.latitude + '-' + position.coords.longitude;

          this._dispatchEvent(
            'location-selector.location-changed',
            this._formPlaceObject(coordinates)
          );
        },
        (error) => {
          this._dispatchEvent('location-selector.locate-error', {
            text: 'salli paikannus nähdäksesi paikkakuntasi sää',
          });
        }
      );
    } else {
      this._dispatchEvent('location-selector.locate-error', {
        text: 'paikantaminen epäonnistui, yritä uudelleen',
      });
    }
  }

  _dispatchEvent(name, payload) {
    const event = new CustomEvent(name, {
      detail: payload,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _formPlaceObject(coordinates) {
    return { city: undefined, coordinates: coordinates };
  }
}

window.customElements.define(GeolocateButton.is, GeolocateButton);
