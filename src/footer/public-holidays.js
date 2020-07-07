import { css, html, LitElement } from 'lit-element';

import './footer-section.js';

class PublicHolidays extends LitElement {
  static get is() {
    return 'public-holidays';
  }

  static get properties() {
    return {
      _holidays: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      section {
        display: grid;
        grid-template-columns: 5.5rem 2rem auto;
      }
      .date {
        text-align: right;
        padding-right: 0.5rem;
      }
      .calendar-logo {
        fill: var(--color-blue-700);
      }
    `;
  }

  render() {
    return html`
      <footer-section header="Kalenteri 2020">
        ${this._holidays.map(
          (item) =>
            html`
              <section>
                <div class="date">
                  ${new Date(item.d).toLocaleDateString('fi-FI', {
                    weekday: 'short',
                  })}
                  ${new Date(item.d).toLocaleDateString('fi-FI')}
                </div>

                <div class="flag">
                  ${item.flag === true
                    ? html`
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="11"
                        >
                          <rect
                            width="18"
                            height="11"
                            fill="#fff"
                            stroke-width="1"
                            stroke="#ccc"
                          />
                          <rect width="18" height="3" y="4" fill="#003580" />
                          <rect width="3" height="11" x="5" fill="#003580" />
                        </svg>
                      `
                    : ''}
                </div>
                <div>
                  ${item.free === true ? html` (vapaa) ` : ''} ${item.n}
                </div>
              </section>
            `
        )}
        <div slot="footer-left"></div>
        <svg
          slot="footer-right"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          class="calendar-logo"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M5 8h14V6H5z" opacity=".3" />
          <path
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"
          />
        </svg>
      </footer-section>
    `;
  }

  constructor() {
    super();

    // free=vapaapäivä, f=liputuspäivä, static=always the same date
    this._holidays = [
      { d: '2020-01-01', n: 'Uudenvuodenpäivä', free: true, static: true },
      { d: '2020-01-06', n: 'Loppiainen', free: true, static: true },
      { d: '2020-02-05', n: 'J.L.Runebergin päivä', flag: true, static: true },

      { d: '2020-02-28', n: 'Kalevalan päivä', flag: true, static: true },
      {
        d: '2020-03-19',
        n: 'Minna Canthin ja tasa-arvon päivä',
        flag: true,
        static: true,
      },
      { d: '2020-04-12', n: 'Pääsiäissunnuntai', free: true },

      { d: '2020-04-13', n: 'Toinen pääsiäispäivä', free: true },
      {
        d: '2020-04-27',
        n: 'Kansallinen veteraanipäivä',
        flag: true,
        static: true,
      },
      { d: '2020-05-01', n: 'Vappu', free: true, flag: true, static: true },

      { d: '2020-05-09', n: 'Eurooppa-päivä', flag: true, static: true },
      { d: '2020-05-10', n: 'Äitienpäivä', flag: true },
      {
        d: '2020-05-12',
        n: 'J.V. Snellmanin ja suomalaisuuden päivä',
        flag: true,
        static: true,
      },

      { d: '2020-05-17', n: 'Kaatuneiden muistopäivä', flag: true },
      { d: '2020-05-21', n: 'Helatorstai', free: true },
      {
        d: '2020-06-04',
        n: 'Puolustusvoimain lippujuhlan päivä',
        flag: true,
        static: true,
      },

      { d: '2020-05-31', n: 'Helluntai', free: true },
      { d: '2020-06-19', n: 'Juhannusaatto' },
      { d: '2020-06-20', n: 'Juhannus', free: true, flag: true },
      { d: '2020-07-06', n: 'Eino Leinon päivä', flag: true, static: true },

      { d: '2020-10-10', n: 'Aleksis Kiven päivä', flag: true, static: true },
      {
        d: '2020-10-24',
        n: 'yhdistyneiden kansakuntien päivä',
        flag: true,
        static: true,
      },
      { d: '2020-10-31', n: 'Pyhäinpäivä', free: true },

      { d: '2020-11-06', n: 'Ruotsalaisuuden päivä', flag: true, static: true },
      { d: '2020-11-08', n: 'Isänpäivä', flag: true },
      {
        d: '2020-12-06',
        n: 'Itsenäisyyspäivä',
        free: true,
        flag: true,
        static: true,
      },

      {
        d: '2020-12-08',
        n: 'Jean Sibeliuksen päivä',
        flag: true,
        static: true,
      },
      { d: '2020-12-25', n: 'Jouluaatto', static: true },
      { d: '2020-12-25', n: 'Joulupäivä', free: true, static: true },
      { d: '2020-12-26', n: 'Tapaninpäivä', free: true, static: true },
    ];
  }
}
window.customElements.define(PublicHolidays.is, PublicHolidays);
