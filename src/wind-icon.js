import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class WindIcon extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
      }
      .windIcon {
        height: 24px;
        width: 24px;
        
        padding-right: 0.35rem;
      }

      .windIcon--large {
        height: 30px;
        width: 30px;

        transition: all .2s ease-in-out;
      }

      .windIcon--large:hover {
        transform: scale(1.1);
      }

      .windSpeed {
        font-weight: 900;
        font-size: 50px;
      }

      .windIcon_arrow {
        fill: #ffcdd2;
        stroke: var(--color-black);
      }

      .windIcon_circle {
        fill: var(--color-white);
        stroke: var(--color-black);
      }

    </style>

    <span id="iconPlaceholder"></span>

    [[_createIcon(degrees, roundedWindSpeed)]]
`;
  }

  static get is() { return 'wind-icon'; }

  static get properties() {
    return {
      degrees: {
        type: Number
      },
      large: {
        type: Boolean
      },
      round: {
        type: Boolean
      },
      windSpeed: {
        type: Number
      },
      roundedWindSpeed: {
        computed: '_round(windSpeed, round)'
      }
    };
  }

  ready(){
    super.ready();
  }

  _createIcon(degrees, speed){
    if(!Number.isNaN(degrees) && !Number.isNaN(speed)){
      let svg = this._svg(this.large);
      
      let group = this._group(degrees);
      group.appendChild(this._windIconArrow());
      group.appendChild(this._windIconCircle());
                
      svg.appendChild(group);
      svg.appendChild(this._wind(speed));


      if(this.$.iconPlaceholder.children.length > 0) {
        this.$.iconPlaceholder.removeChild(this.$.iconPlaceholder.children[0]);
      }

      this.$.iconPlaceholder.appendChild(svg);
    }
  }

  _group(degrees){
    const transform = (degrees + 180) % 360;
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute('transform', 'rotate(' + transform + ', 50, 50)');

    return g;
  }

  _round(speed, round) {
    return round ? Math.round(speed) : speed;
  }

  _svg(large) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    // min-x, min-y, width and height
    svg.setAttribute('id', 'windIcon');
    svg.setAttribute('class', 'windIcon');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    if(large) {
      svg.setAttribute('class', 'windIcon--large');
    }

    return svg;
  }

  _windIconArrow(){

    let line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('class', 'windIcon_arrow');

    line.setAttribute('stroke-width', '3');      
    line.setAttribute('points', '36,16 50,0 64,16');

    return line;
  }

  _wind(speed) {
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('x', '49');
    text.setAttribute('y', '70');
    
    text.setAttribute('class', 'windSpeed');
    text.textContent = speed;

    return text;
  }

  _windIconCircle() {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'windIcon_circle');
    circle.setAttribute('stroke-width', '3.5');      

    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '36');
    
    return circle;

  }
}

window.customElements.define(WindIcon.is, WindIcon);
