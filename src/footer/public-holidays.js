import { css, html, LitElement } from 'lit-element';

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
        grid-template-columns: 5.5rem 3.5rem 2rem auto;
      }
      .date {
        text-align: right;
        padding-right: 0.5rem;
      }
    `;
  }

  render() {
    return html`
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
              <div class="free">
                ${item.free === true ? html` (vapaa) ` : ''}
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
                ${item.n}
              </div>
            </section>
          `
      )}
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
