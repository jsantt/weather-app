import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class TemperatureLine extends PolymerElement {
  static get template() {
    return html`
    <style>
      .chart {
        position: relative;
      }      
      .svg {
        position: absolute;
        bottom: 0;
       
        overflow: visible;
      }
    </style>
    [[_createChart(dayData)]]

    <!-- placeholder for chart -->
    <div class="chart" id="chart"></div>
`;
  }

  static get is() { return 'temperature-line'; }

  static get properties() {
    return {
      minTemperature: {
        type: Number
      },
      dayData: {
        type: Array
      },
      _chartHeight: {
        type: Number,
        value: 25
      }
    };
  }
  ready() {
    super.ready();
  }

  /**
   * Chart containing rain bars, temperature line, past time shadow and present time triangle
   */
  _createChart(dayData) {
    let svg = this._svg();
    
    let line = this._temperatureLine(this._temperatureCoordinates(dayData));
    svg.appendChild(line);

    // remove previous childs
   
    if(this.$.chart.children.length > 0) {
      this.$.chart.removeChild(this.$.chart.children[0]);
    }

    this.$.chart.appendChild(svg);
  }

  _svg(){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    // min-x, min-y, width and height
    svg.setAttribute('viewBox', '0 0 240 ' + this._chartHeight); 
    svg.setAttribute('id', 'chartsvg'); 
    svg.setAttribute('width','100%');
    svg.setAttribute('height', this._chartHeight);
    
    svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('class', 'svg');
    return svg;
  }

  _temperatureLine(coordinates){
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#fe0101');

    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-opacity', '0.15');      
    line.setAttribute('points', coordinates);

    return line;

  }

  _temperatureCoordinates(data){
    let points = '';

    // bigger number indicate more variance in line height 
    const lineVariance = 5; 
    
    // Min margin for temperature graph
    const bottomMargin = 0;
    const baseX = this._chartHeight + this.minTemperature*lineVariance - bottomMargin;


    for(let i = 0; i < data.length; i++) {
        if(!Number.isNaN(data[i].temperature)) {
          points = points + (i*10) + ',' + (baseX + data[i].temperature*-lineVariance) + ' '; 
        }
    }

    return points;
  }
}

window.customElements.define(TemperatureLine.is, TemperatureLine);
