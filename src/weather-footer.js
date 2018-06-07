import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './ios-add-to-homescreen.js';

class WeatherFooter extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      footer {
        background-color: var(--color-primary);
        padding: 1rem 1rem 1rem 1rem;
      }

      footer section {
        margin: 1rem 0;
      }
    
      .footer_header {
        color: var(--color-white);
        margin: 1rem 0 2rem 0;
        text-align: center;
      }

      footer h3 {
        color: var(--color-palette-blue);
        font-size: var(--font-size-small);
        font-weight: 400;
 
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }

      footer p {
        margin: 0;
        padding: 0;
      }

    </style>

<footer>
    <p class="footer_header">Säädata by Ilmatieteen laitos | avoin data</p>

    <p class="footer_header"><ios-add-to-homescreen></ios-add-to-homescreen></p>
    
    <section class="footer_section">
        <h3>Sää nyt</h3>  
        <p class="info">
            Viimeisin havainto tehtiin klo [[_formatTime(observationData.time)]] 
            havaintoasemalta [[observationData.weatherStation]]
             
        </p><p>
      </p><section>


    <section class="footer_section">
      <h3>Ennuste</h3>  
      <p class="info">
        Sääsymbolit tulevat ilmatieteen laitoksen Hirlam-ennusteesta;
        lämpötilan sekä tuulen ennusteessa käytetään tarkempaa 
        <a href="http://ilmatieteenlaitos.fi/tutkimustoiminta/-/asset_publisher/Dz9C/content/uusin-versio-harmonie-arome-saamallista-parantaa-pilvisyyden-ja-tuulen-ennusteita?redirect=http%3A%2F%2Filmatieteenlaitos.fi%2Ftutkimustoiminta%3Fp_p_id%3D101_INSTANCE_Dz9C%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2">
        Harmonie-ennustetta</a>
      </p><p>
    </p><section>

    <section class="footer_section">
        <h3>Palaute</h3>  
        <p class="info">
            <a href="https://www.linkedin.com/in/janisantti">
              www.linkedin.com/in/janisantti
            </a>
        </p><p>
      </p><section>

  </section></section></section></section></section></section></footer>
`;
  }

  static get is() { return 'weather-footer'; }

  static get properties() {
    return {
      observationData: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _formatTime(time) {
    const parsedTime = new Date(time);
    
    const minutes = parsedTime.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return  parsedTime.getHours() + '.' + fullMinutes;
  }
}

window.customElements.define(WeatherFooter.is, WeatherFooter);
