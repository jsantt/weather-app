import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './ios-add-to-homescreen.js';
import './share-app.js';

class WeatherFooter extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          color: var(--color-black);
        }

        .footer_header {
          padding: var(--space-m) 0 var(--space-l) 0;
          text-align: center;
          margin: var(--space-m) 0;
          text-align: center;
        }

        footer h3 {          
          font-size: var(--font-size-small);
          font-weight: 600;
          
          margin: var(--space-l) 0;
          padding: 0 var(--space-l);
          
        }

        footer p {
          margin: 0 var(--space-l);
          padding: 0;
        }
        a:link,
        a:visited {
          color: var(--color-black);
        }
        .logo {
          margin-top: var(--space-m);
        }
      </style>
        <footer>
   
        <p class="footer_section">
          <ios-add-to-homescreen> </ios-add-to-homescreen>
        </p>

          <p class="footer_header">
            Sääennuste by Ilmatieteen laitos | avoin data<br />
            <img
              class="logo"
              alt="fmi logo"
              src="../image/FMI0DATA_small.png"
            />
      </p>
          
          <section class="footer_section">
            <h3>Aurinko</h3>
            <p class="info">
              <slot name="sunrise-sunset"></slot>
            </p>
          </section>

          <section class="footer_section">
            <h3>2020 Kalenteri</h3>
            <p class="info">
              <slot name="public-holidays"></slot>
            </p>
          </section>

          <section class="footer_section">
            <h3>Tietoja palvelusta</h3>
            <p class="info">
              Paras sääsovellus - sekä sääennuste että havaintoasemien sää helposti luettavassa
              muodossa. Ennuste perustuu Ilmatieteen laitoksen tarkkaan
              <a
                href="http://ilmatieteenlaitos.fi/tutkimustoiminta/-/asset_publisher/Dz9C/content/uusin-versio-harmonie-arome-saamallista-parantaa-pilvisyyden-ja-tuulen-ennusteita?redirect=http%3A%2F%2Filmatieteenlaitos.fi%2Ftutkimustoiminta%3Fp_p_id%3D101_INSTANCE_Dz9C%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2"
              >
                Harmonie-malliin</a
              >
            </p>
            <p>
              
            </p>
          </section>
          
          <section class="footer_section">
            <h3>Palaute</h3>
            <p class="info">
              palaute@saaennuste.fi
            </p>
            <p></p>
          </section>

          <section class="footer_section">
            <h3>Evästeet</h3>
            <p class="info">
              Käytämme vain
              <a
                href="https://policies.google.com/technologies/partner-sites?hl=fi"
              >
                Googlen analytiikkatyökalun</a
              >
              tarvitsemia evästeitä.
            </p>
            <p></p>
          </section>

          <template is="dom-if" if="[[_offline]]">
            <section>
              Ei verkkoyhteyttä
              <!-- - Ennuste on 3h vanha-->
            </section>
          </template>

          <share-app></share-app>
          <br /><br /><br />
        </footer>
      </div>
    `;
  }

  static get is() {
    return 'weather-footer';
  }

  static get properties() {
    return {
      observationData: {
        type: Object,
      },
      _offline: {
        type: Boolean,
        value: false,
      },
    };
  }

  ready() {
    super.ready();

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
