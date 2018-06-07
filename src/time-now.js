import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class TimeNow extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        width: 100%;
      }

      .time {
        color: var(--color-white);
      }
    </style>

    <div class="time" style\$="[[timeMargin]]">
      [[timeNow]]
    </div>
`;
  }

  static get is() { return 'time-now'; }

  static get properties() {
    return {
      timeMargin: {
        type: String
      },
      timeNow: {
        type: String
      },
      updateTime: {
        type: Boolean,
        observer: '_updateTime'
      }
    };
  }

  ready() {
    super.ready();
    this._updateTime();
  }

  _calculateMargin() {
    const hours = new Date().getHours();
    const margin = ((hours - 1) / 24) * 100;
    this.timeMargin = 'margin-left:' + margin + '%';
  }

  _timeNow() {
    const now = new Date();
    const minutes = now.getMinutes();

    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    const time = now.getHours() + '.' + fullMinutes;
    this.timeNow = time;
  }

  _updateTime() {
    this._calculateMargin();
    this._timeNow();
  }
}

window.customElements.define(TimeNow.is, TimeNow);
