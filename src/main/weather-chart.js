import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class WeatherChart extends PolymerElement {
  static get template() {
    return html`
    <style>
      .chart {
        position: relative;
      }  

      .rainBar {
        fill: var(--color-primary);
      }

      .svg {
        padding-bottom: 0.1rem;

        position: absolute;
        bottom: 0;

        overflow: visible;
        z-index: -1;
      }
    </style>
    [[_createChart(dayData)]]

    <!-- placeholder for chart -->
    <div class="chart" id="chart"></div>
`;
  }

  static get is() { return 'weather-chart'; }

  static get properties() {
    return {
      dayData: {
        type: Array
      },
    
      minTemperature: {
        type: Number
      },
      
      _chartHeight: {
        type: Number,
        value: 50
      }
    };
  }
  ready() {
    super.ready();
  }

  /**
   * Chart containing rain bars
   */
  _createChart(dayData) {
    let svg = this._svg();

    this._rainBars(svg, dayData);
    
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

  _rainBars(svg, data) {
    
    for(let i = 0; i < data.length; i++) {
      
      if(!Number.isNaN([i].rain)) {
        let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        
        bar.setAttribute('class', 'rainBar');
        
        let opacity = data[i].past ? '0.3' : '1'; 
        bar.setAttribute('fill-opacity', opacity);      
        bar.setAttribute('width', '9');
      
        // draw rectangle of height 20 x rain amount, 120 being maximum height
        const rectHeight = Number.isNaN(data[i].rain) ? 0 : Math.min(data[i].rain*20, 120);

        bar.setAttribute('height', rectHeight);

        // define top left corner of rectangle
        bar.setAttribute('y', this._chartHeight - rectHeight);
        bar.setAttribute('x', i*9.6);
      
        svg.appendChild(bar);
      }
    } 
  }

  _timeNowTriangle(){
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('stroke-opacity', '1');
    line.setAttribute('fill', '#fff');
    line.setAttribute('points', this._trianglePoints(this._hoursNow()));
    return line;   
  }

  _trianglePoints(time){
    const bottomX = (time / 24)*230;
    const bottomY = 10;

    const topLeftX = bottomX - 5;
    const topLeftY = 0;

    const topRightX = bottomX + 5;
    const topRightY = 0

    return `${topLeftX},${topLeftY} ${bottomX},${bottomY} ${topRightX},${topRightY}`;
  }

  _hoursNow(){
    return new Date().getHours();
  }
}

window.customElements.define(WeatherChart.is, WeatherChart);
