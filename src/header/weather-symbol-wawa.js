import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

/**
 * See wawa names: https://helda.helsinki.fi/bitstream/handle/10138/37284/PRO_GRADU_BOOK_HERMAN.pdf?sequence=2
 */
class WeatherSymbolWawa extends PolymerElement {
  static get template() {
    return html`
    <style>
     
    </style>
    
    <span>[[_symbolName(wawaId)]]</span>
`;
  }

  static get is() { return 'weather-symbol-wawa'; }

  static get properties() {
    return {
        wawaId: {
            type: Number
        }
    };
  }
  _symbolName(wawaId){    
    
      const wawaNames = {
        0: 'selkeää',            
        4: 'Auerta, savua tai pölyä',
        5: 'Auerta, savua tai pölyä, näkyvyys alle 1km',

        10: 'utua',  
        20: 'sumua',
        21: 'sadetta',
        22: 'tihkusadetta',
        23: 'vesisadetta',
        24: 'lumisadetta',
        25: 'jäätävää vesisadetta',

        30: 'sumua',
        31: 'sumua',
        32: 'sumua',
        33: 'sumua',
        34: 'sumua',
        
        40: 'sadetta',
        41: 'heikkoa sadetta',
        42:  'voimakasta sadetta',

        50: 'tihkusadetta',
        51: 'heikkoa tihkusadetta',
        52: 'kohtalaista tihkusadetta',
        53: 'voimakasta tihkusadetta',
        54: 'jäätävää heikkoa tihkusadetta',
        55: 'jäätävää kohtalaista tihkusadetta',
        56: 'jäätävää kovaa tihkusadetta',

        61: 'heikkoa vesisadetta',
        62: 'vesisadetta',
        63: 'voimakasta vesisadetta',
        
        64: 'jäätävää heikkoa vesisadetta',
        65: 'jäätävää vesisadetta',
        66: 'jäätävää voimakasta vesisadetta',
        
        67: 'räntäsadetta',
        68: 'voimakasta räntäsadetta',
       
        70: 'lumisadetta',
        71: 'heikkoa lumisadetta',
        72: 'lumisadetta',
        73: 'voimakasta lumisadetta',

        74: 'heikkoa lumisadetta',
        75: 'lumisadetta',
        76: 'voimakasta lumisadetta',

        77: 'lumisadetta',
        78: 'lumisadetta',
        
        80: 'heikkoja sadekuuroja',
        81: 'heikkoja sadekuuroja',
        82: 'sadekuuroja',
        83: 'voimakkaita sadekuuroja',
        84: 'voimakkaita sadekuuroja',
        85: 'heikkoja lumikuuroja',
        86: 'lumikuuroja',
        87: 'voimakkaita lumikuuroja',
        89: 'raekuuroja',     
    }

    return wawaNames[wawaId];
  }
}

window.customElements.define(WeatherSymbolWawa.is, WeatherSymbolWawa);
