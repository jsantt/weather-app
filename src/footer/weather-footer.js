import { css, html, LitElement } from 'lit-element';
import './share-app.js';

class WeatherFooter extends LitElement {
  static get is() {
    return 'weather-footer';
  }

  static get styles() {
    return css`
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
        color: var(--color-gray-800);
        font-size: var(--font-size-small);
        font-weight: 600;

        text-transform: uppercase;
        font-weight: 900;

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
      .links {
        display: flex;
        justify-content: space-around;

        padding: var(--space-l) 0;
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
          
          <section class="footer_section">
            <h3>Lähin sääasema</h3>
            <p class="info">
              <slot name="observations"></slot>
            </p>
          </section>
          <section class="footer_section">
            <h3>Katso myös</h3>
            <div class="info">
              <div class="links">

                <a href="https://www.sataako.fi">
                  sadetutka
                </a>

                <a href="https://www.ilmatieteenlaitos.fi/uvi-ennuste">
                  UV-indeksi
                </a>
              
                <a href="https://www.ilmatieteenlaitos.fi/paikallissaa">
                10 vrk sää</a>

                <a href="https://www.nordicweather.net/ukkostutka.php?fi#8/60.297/24.120">
                ukkostutka</a>
              </div>
            </div>
          </section>
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
              Saaennuste.fi on nopein ja paras sääsovellus. Löydät Helsingin, Espoon ja muiden kaupunkien lisäksi myös
              tarkan täsmäsään 2.5km alueelle.  Ennuste perustuu luotettavaan ja tarkkaan Ilmatieteen laitoksen
              <a
                href="http://ilmatieteenlaitos.fi/tutkimustoiminta/-/asset_publisher/Dz9C/content/uusin-versio-harmonie-arome-saamallista-parantaa-pilvisyyden-ja-tuulen-ennusteita?redirect=http%3A%2F%2Filmatieteenlaitos.fi%2Ftutkimustoiminta%3Fp_p_id%3D101_INSTANCE_Dz9C%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2"
              >
                Harmonie-malliin</a
              >
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
