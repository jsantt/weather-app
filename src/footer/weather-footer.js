import { css, html, LitElement } from 'lit-element';

import './external-links.js';
import './footer-section.js';
import './share-app.js';

class WeatherFooter extends LitElement {
  static get is() {
    return 'weather-footer';
  }

  static get styles() {
    return css`
      :host {
        border-radius: var(--border-radius);
        display: block;
        color: var(--color-black);
      }

      .section--sun,
      .section--calendar,
      .section--informationOnService,
      .section--feedback,
      .section--cookies {
        --background-color-main: var(--color-white);
      }

      .section--observations {
        --background-color-main: #b7e1cd;
      }

      .footer_header {
        padding: var(--space-m) 0 var(--space-l) 0;
        text-align: center;
        margin: var(--space-m) 0;
        text-align: center;
      }

      a:link,
      a:visited {
        color: var(--color-black);
      }

      .logo {
        margin-top: var(--space-m);
      }
    `;
  }

  render() {
    return html`
        <footer>

          <p class="footer_header">
            Sääennuste by Ilmatieteen laitos | avoin data<br />
            <img
              class="logo"
              alt="fmi logo"
              src="../image/FMI0DATA_small.png"
            />
          </p>
          
          <footer-section 
            class="section--observations"
            header="lähin havaintoasema">
            <slot name="observations"></slot>
          </footer-section>

          <footer-section 
            class="section--sun"
            header="Aurinko">
            <slot name="sunrise-sunset"></slot>
          </footer-section>

          <footer-section 
            class="section--links">
            
            <external-links></external-links>
          
          </footer-section>

          
          <footer-section 
            class="section--calendar"
            header="Kalenteri 2020">
            <slot name="public-holidays"></slot>
          </footer-section>

          <footer-section 
            class="section--informationOnService"
            header="Tietoja palvelusta">
                Saaennuste.fi on nopein ja paras sääsovellus. Löydät Helsingin, Espoon ja muiden kaupunkien lisäksi myös
                tarkan täsmäsään 2.5km alueelle.  Ennuste perustuu luotettavaan ja tarkkaan Ilmatieteen laitoksen
                <a
                  href="http://ilmatieteenlaitos.fi/tutkimustoiminta/-/asset_publisher/Dz9C/content/uusin-versio-harmonie-arome-saamallista-parantaa-pilvisyyden-ja-tuulen-ennusteita?redirect=http%3A%2F%2Filmatieteenlaitos.fi%2Ftutkimustoiminta%3Fp_p_id%3D101_INSTANCE_Dz9C%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2"
                >
                  Harmonie-malliin</a
                >
          </footer-section>
          
          <footer-section 
            class="section--feedback"
            header="Palaute">
              palaute@saaennuste.fi
          </footer-section>

          <footer-section 
            class="section--cookies"
            header="Evästeet">
              Käytämme vain
              <a
                href="https://policies.google.com/technologies/partner-sites?hl=fi"
              >
                Googlen analytiikkatyökalun</a
              >
              tarvitsemia evästeitä.
          </footer-section>
          ${
            this._offline === false
              ? ''
              : html`
                  <section class="footer_section">
                    <p class="info">Ei verkkoyhteyttä</p>
                    <!-- - Ennuste on 3h vanha-->
                  </section>
                `
          }

          <br /><br /><br />
          <share-app></share-app>
          <br /><br /><br /><br />
        </footer>
      </div>
    `;
  }

  static get properties() {
    return {
      observationData: {
        type: Object,
      },
      _offline: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();

    this._offline = !navigator.onLine;

    window.addEventListener('offline', () => {
      this._offline = true;
    });

    window.addEventListener('online', () => {
      this._offline = false;
    });
  }

  _formatTime(time) {
    const parsedTime = new Date(time);

    const minutes = parsedTime.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return parsedTime.getHours() + '.' + fullMinutes;
  }
}

window.customElements.define(WeatherFooter.is, WeatherFooter);
