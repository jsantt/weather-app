import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icon/iron-icon.js';

class ErrorNotification extends PolymerElement {
  static get template() {
    return html`

    <style>

      section {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5rem var(--space-l) 7rem var(--space-l);
      }

      iron-icon {
        height: 96px;
        width: 96px;
      }      
    </style>

    <section>
      <div>
        <iron-icon icon="weather-symbol-icons:weatherSymbol64"></iron-icon>
        <div>[[errorText]]</div>
        <div><a href="">kokeile uudelleen</a></div>
      <div>
    </section>
  
`;
  }

  static get is() {
    return 'error-notification';
  }

  static get properties() {
    return {
      errorText: {
        type: String,
      },
    };
  }

  ready() {
    super.ready();
  }

  show() {
    this.removeAttribute('hidden');
  }
}

window.customElements.define(ErrorNotification.is, ErrorNotification);
