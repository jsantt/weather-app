import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';


class iosAddToHomescreen extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      p {
        margin-bottom: 0;
      }

    </style>

    <template is="dom-if" if="{{_showPrompt()}}">
      <p>
        Tykkäätkö? Napauta 
        
        <iron-icon icon="weather-icons:iosShare"></iron-icon> 
        
        ja ‘lisää kotivalikkoon’
      </p>
    </template>
`;
  }

  static get is() { return 'ios-add-to-homescreen'; }

  static get properties() {
    return {
      
    };
  }

  _showPrompt() {
    
    if (navigator.standalone) {
      return false;
    }

    let isApple = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
    return isApple;
  }
}

window.customElements.define(iosAddToHomescreen.is, iosAddToHomescreen);
