import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ObservationModal extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;

        --content-padding: 0.5rem;
      }
      .close {
        color: var(--color-white);

        font-family: 'Open Sans Condensed', sans-serif;
        font-size: var(--font-size-xxlarge);
        font-weight: 900;
        padding: 0rem 1rem 0.5rem 0.5rem;
        
        position: absolute;
        right: 1rem;

        z-index: 11;
      }
      .close:hover,
      .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }

      section {
        position: fixed; /* Stay in place */
        z-index: 10; 
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }

      .modal {
        background-color: #fefefe;
        margin: 7% auto; /* 7% from the top and centered */

        max-width: 25rem;
        width: 80%; /* Could be more or less, depending on screen size */

        padding: var(--content-padding);
        position: relative;
        border: 1px solid #888;
        border-radius: 0.6rem;
      }

      .loading {
        opacity: 0.5;
      }

    </style>
  
    <section 
      on-click="_toggleObservation"
      hidden$=[[!visible]]>

        <div class="modal">

          <span 
            class="close">
            &times;
          </span>

          <!-- MODAL CONTENT IS INCLUDED HERE -->
          <slot></slot>
          
      </section>
    `;
  }

  static get is() { return 'observation-modal'; }

  static get properties() {
    return {
      visible: {
        type: Boolean
      },
      observationData: {
        type: Object
      },
      place: {
        type: String
      }
    };
  }

  ready() {
    super.ready();
  }

  _toggleObservation() {
    const event = new CustomEvent('observation-modal.toggle-observation', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }
}

window.customElements.define(ObservationModal.is, ObservationModal);
