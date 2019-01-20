import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class DayItem extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        background-color: #f5f5f59e;
      }

      .item {
        background-color: #f9f9f9;
        border-radius: 7rem;
      }

      .item--color1 {
        background-color: #fce8b2a3;
      }

      .item--color2 {
        background-color: #c539298f;
      }

      .item--color3 {
        background-color: #c539298f;
      }

    </style>
    
    <div class$="[[_getClazz(highlightColor)]]">
        <slot></slot>
    </div>
            
`;
  }

  static get is() { return 'day-item'; }

  static get properties() {
    return {
      highlightColor: {
        type: Number
      }
    }
  }

  _getClazz(color){
    const item = `item item--color${color}`;
    console.log(item);
    return item;
  }
}

window.customElements.define(DayItem.is, DayItem);
