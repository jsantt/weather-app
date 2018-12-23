import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icon/iron-icon.js';


class iosAddToHomescreen extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      .notification {
        display: flex;
        align-items:center;
        justify-content: space-around;

        color: black;
      }

      .notification--floating {

        box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.46);

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        
       

        padding: 0.7rem 0;
        z-index:10;
      }

      .test{
        border: 0px dashed gray;
      }

      .sun {
        --iron-icon-width: 32px;
        --iron-icon-height: 32px;  
      }

      .text {
        padding-top: 0.25rem;
      }

      .close {
        font-size: var(--font-size-xxlarge);
      }

      .sun, .close {
        padding: 0 1.5rem;
      }

      .share {
        --iron-icon-stroke-color: var(--color-white);
        --iron-icon-fill-color: var(--color-white);
      }

      .notification--floating .share {
        --iron-icon-stroke-color: #000;
        --iron-icon-fill-color: #000;
      }

      .notification--normal .close, .notification--normal .sun {
        visibility: hidden;
      }

      p {
        margin-bottom: 0;
      }

    </style>

    <template is="dom-if" if="{{_showPrompt()}}">
      <div class$="{{_isFloating(_floating)}}">

        <iron-icon class="sun test" icon="weather-symbol-icons:weatherSymbol1"></iron-icon>
        
        <div class="text test">
          Tykkäätkö? Napauta 
          
          <iron-icon class="share" icon="weather-icons:iosShare"></iron-icon> 
          
          ja ‘lisää kotivalikkoon’
        </div>

        <div 
          class="close test"
          on-click="_onClose">
          &times;
        </div>
        
      </div>  
    </template>
`;
  }

  static get is() { return 'ios-add-to-homescreen'; }

  static get properties() {
    return {
      _floating: {
        type: Boolean,
        value: true
      }
    };
  }


  _showPrompt() {
    if (navigator.standalone) {
      return false;
    }

    let isApple = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
    return isApple;
  }

  _isFloating(floating) {
    
    if(floating === false) {
      return 'notification notification--normal';
    }
    else {
      return 'notification notification--floating';
    }
  }
  _onClose() {
    this._floating = false;
  }
}


window.customElements.define(iosAddToHomescreen.is, iosAddToHomescreen);
