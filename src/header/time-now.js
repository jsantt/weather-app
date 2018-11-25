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
        margin-left: -1rem;
        width: 100%;
      }

      .time {
        color: var(--color-white);
        white-space: nowrap;
      }
    </style>

    <div class="time" style\$="[[timeMargin]]">
      <svg style="width:12px;height:12px" viewBox="0 0 24 24">
        <path fill="#ffffff" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"></path>
      </svg>[[timeNow]]
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
    
    const margin = ((hours - 1) / 24) * 100
    
    const correctLeftOverflow = Math.max(0, margin);
    const correctRightOverflow = Math.min(correctLeftOverflow, 95);

    this.timeMargin = 'margin-left:' + correctRightOverflow + '%';
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