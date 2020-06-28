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
        color: var(--color-blue-800);
      }

      .section--sun,
      .section--calendar,
      .section--informationOnService,
      .section--feedback,
      .section--cookies,
      .section--observations {
        --background-color: var(--color-white);
        --color: var(--color-blue-700);
      }

      @media only screen and (min-width: 26rem) {
        .section--observations,
        .section--links {
          max-width: 26rem;
          margin-left: auto;
          margin-right: auto;
        }
      }

      .footer_header {
        font-weight: var(--font-weight-bold);
        padding: var(--space-m) 0 var(--space-l) 0;
        text-align: center;
        margin: var(--space-m) 0;
        text-align: center;
      }

      a:link {
        color: var(--color-blue-500);
      }

      a:visited,
      a:hover {
        color: var(--color-blue-700);
      }

      .logo {
        margin-top: var(--space-s);
      }

      svg {
        fill: var(--color-blue-700);
        margin-right: var(--space-s);
      }

      .info-icon {
        float: left;
        margin: var(--space-m) var(--space-m) var(--space-s) var(--space-m);
      }

      .email {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--space-l);
      }

      .section--copyright {
        text-align: center;
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
            class="section--links">
            <external-links></external-links>
          </footer-section>

          <footer-section 
            class="section--sun"
            header="Aurinko">
            <slot name="sunrise-sunset"></slot>
          </footer-section>
          
          <footer-section 
            class="section--calendar"
            header="Kalenteri 2020">
            <slot name="public-holidays"></slot>
          </footer-section>

          <footer-section 
            class="section--informationOnService"
            header="Tietoja palvelusta">
            <div class="info-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24" 
                viewBox="0 0 24 24" 
                width="24">
                  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z" opacity=".3"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>

              Saaennuste.fi on nopein ja paras sääsovellus. Löydät Helsingin, Espoon ja muiden kaupunkien lisäksi myös
                tarkan täsmäsään 2.5km alueelle.  Ennuste perustuu luotettavaan ja tarkkaan Ilmatieteen laitoksen
                <a
                  href="http://ilmatieteenlaitos.fi/tutkimustoiminta/-/asset_publisher/Dz9C/content/uusin-versio-harmonie-arome-saamallista-parantaa-pilvisyyden-ja-tuulen-ennusteita?redirect=http%3A%2F%2Filmatieteenlaitos.fi%2Ftutkimustoiminta%3Fp_p_id%3D101_INSTANCE_Dz9C%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-2%26p_p_col_count%3D2"
                >
                  Harmonie-malliin</a
                >.
              
               
          </footer-section>
          
          <footer-section 
            class="section--feedback"
            header="Palaute">
              Puuttuuko sääpalvelusta jokin ominaisuus tai onko sinulla idea miten parantaisit sovellusta? Voinko
              auttaa jotenkin muuten? 
              
            <div class="email"> 
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8l-8 5-8-5v10h16zm0-2H4l8 4.99z" opacity=".3"/><path d="M4 20h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zM20 6l-8 4.99L4 6h16zM4 8l8 5 8-5v10H4V8z"/></svg>
              palaute@saaennuste.fi
            </div>
          </footer-section>

          <footer-section 
            class="section--cookies"
            header="Kerätyt tiedot">
              Parantaaksemme käyttökokemusta, käytämme
              <a
                href="https://policies.google.com/technologies/partner-sites?hl=fi"
              >
                Googlen analytiikkatyökalun</a
              >
              tarvitsemia evästeitä sivuston kävijämäärän ja käyttäytymisen seuraamiseen 
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 12c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5z" opacity=".3"/><circle cx="15.01" cy="18" opacity=".3" r="1"/><circle cx="7" cy="14" opacity=".3" r="2"/><path d="M7 18c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm11.01 6c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zm-4 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm2.49-4c3.03 0 5.5-2.47 5.5-5.5S19.53 3 16.5 3 11 5.47 11 8.5s2.47 5.5 5.5 5.5zm0-9C18.43 5 20 6.57 20 8.5S18.43 12 16.5 12 13 10.43 13 8.5 14.57 5 16.5 5z"/></svg>
              
          </footer-section>
          
          <footer-section class="section--copyright">

            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1.92 9.14c.05.33.16.63.3.88s.34.46.59.62c.23.15.53.22.89.23.21-.01.41-.03.6-.1.2-.07.37-.17.52-.3.15-.13.27-.28.36-.46.09-.18.14-.37.15-.58h1.79c-.01.41-.12.79-.3 1.15-.18.36-.43.67-.74.94-.31.27-.67.48-1.08.63-.41.15-.85.23-1.32.23-.65 0-1.22-.12-1.7-.34-.48-.22-.88-.53-1.2-.91s-.56-.83-.71-1.35c-.15-.52-.23-1.06-.23-1.64v-.27c0-.58.09-1.12.24-1.64.15-.52.39-.97.71-1.36s.72-.69 1.2-.92c.48-.23 1.05-.34 1.7-.34.51 0 .97.07 1.39.23.42.16.78.38 1.08.66.3.28.53.62.7 1.01.17.39.26.82.28 1.29h-1.79c-.01-.22-.05-.44-.14-.64-.09-.2-.2-.38-.34-.53-.14-.15-.32-.27-.52-.36-.19-.08-.4-.12-.63-.13-.37.01-.67.08-.91.23-.25.16-.45.37-.59.62s-.25.54-.3.87c-.05.33-.08.66-.08 1.01v.27c0 .33.03.67.08 1z" opacity=".3"/><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53c.09.2.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29-.17-.39-.4-.73-.7-1.01-.3-.28-.66-.5-1.08-.66-.42-.16-.88-.23-1.39-.23-.65 0-1.22.11-1.7.34-.48.23-.88.53-1.2.92s-.56.84-.71 1.36c-.15.52-.24 1.06-.24 1.64v.27c0 .58.08 1.12.23 1.64.15.52.39.97.71 1.35s.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23.41-.15.77-.36 1.08-.63.31-.27.56-.58.74-.94.18-.36.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58-.09.18-.21.33-.36.46s-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88c-.05-.33-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            <div>Design / toteutus Jani Säntti </div>
            <div>Säädata ja symbolit Ilmatieteen laitos</div>            

          </footer-section>

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
    };
  }

  _formatTime(time) {
    const parsedTime = new Date(time);

    const minutes = parsedTime.getMinutes();
    const fullMinutes = minutes < 10 ? '0' + minutes : minutes;

    return parsedTime.getHours() + '.' + fullMinutes;
  }
}

window.customElements.define(WeatherFooter.is, WeatherFooter);
