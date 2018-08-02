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
    [[_createChart(forecastData)]]

    <!-- placeholder for chart -->
    <div class="chart" id="chart"></div>
`;
  }

  static get is() { return 'weather-chart'; }

  static get properties() {
    return {
      minTemperature: {
        type: Number
      },
      showTimeNow: {
        type: Boolean,
        value: false
      },
      forecastData: {
        type: Array
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
   * Chart containing rain bars, temperature line, past time shadow and present time triangle
   */
  _createChart(forecastData) {
    let svg = this._svg();
    
    if(this.showTimeNow) { 

      /*const pastTimeShadow = this._pastTimeShadow(this._hoursNow());
      svg.appendChild(pastTimeShadow);

      const timeNowTriangle = this._timeNowTriangle();
      sv*/
    }

    this._rainBars(svg, forecastData);
    
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
        bar.setAttribute('fill-opacity', '1');      
        bar.setAttribute('width', 9);
      
        // draw rectangle of height 20 x rain amount
        const rectHeight = Number.isNaN(data[i].rain) ? 0 : data[i].rain*20;
        
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

  _pastTimeShadow(time){
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('fill', '#ddd');
    rect.setAttribute('fill-opacity', '0.4');

    const width = (time / 24)*230;
    rect.setAttribute('width', width);
    rect.setAttribute('height', 200 );

    rect.setAttribute('y', -102);
    rect.setAttribute('x', 0);

    return rect;   
  }

  _hoursNow(){
    return new Date().getHours();
  }
}

window.customElements.define(WeatherChart.is, WeatherChart);