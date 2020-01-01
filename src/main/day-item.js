import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class DayItem extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          --warning1-color: #ffa8004a;
          --warning2-color: #ffa8004a;
          --warning3-color: #ff00004a;
        }

        .item {
          background-color: #f3f3f3;
          padding: 0.5rem 0;
        }
      </style>

      <div class$="[[_getClass(highlightColor)]]">
        <slot></slot>
      </div>
    `;
  }

  static get is() {
    return "day-item";
  }

  static get properties() {
    return {
      highlightColor: {
        type: Number
      }
    };
  }

  _getClass(color) {
    const item = `item item--color${color}`;
    console.log(item);
    return item;
  }
}

window.customElements.define(DayItem.is, DayItem);
