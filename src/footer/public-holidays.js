import { css, html, LitElement } from "lit-element";

class PublicHolidays extends LitElement {
  static get is() {
    return "public-holidays";
  }

  static get properties() {
    return {
      _holidays: { type: String }
    };
  }

  static get styles() {
    return css`
      section {
        display: flex;
      }
      .day {
        width: 5rem;
        text-align: right;
        padding-right: 0.5rem;
      }
      .flag {
        width: 2rem;
      }
      .free {
        width: 3rem;
      }
    `;
  }

  render() {
    return html`
      ${this._holidays.map(
        item =>
          html`
            <section>
              <div class="day">
                ${new Date(item.d).toLocaleDateString("fi-FI", {
                  weekday: "short"
                })}
                ${new Date(item.d).toLocaleDateString("fi-FI")}
              </div>
              <div class="free">
                ${item.free === true
                  ? html`
                      (vapaa)
                    `
                  : ""}
              </div>
              <div class="flag">
                ${item.flag === true
                  ? html`
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="11"
                      >
                        <rect width="18" height="11" fill="#fff" />
                        <rect width="18" height="3" y="4" fill="#003580" />
                        <rect width="3" height="11" x="5" fill="#003580" />
                      </svg>
                    `
                  : ""}
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

    // free=vapaapäivä, f=liputuspäivä
    this._holidays = [
      { d: "2019-01-01", n: "Uudenvuodenpäivä", free: true },
      { d: "2019-01-06", n: "Loppiainen", free: true },
      { d: "2019-02-05", n: "J.L.Runebergin päivä", flag: true },

      { d: "2019-02-28", n: "Kalevalan päivä", flag: true },
      { d: "2019-03-19", n: "Minna Canthin ja tasa-arvon päivä", flag: true },
      { d: "2019-04-21", n: "Pääsiäissunnuntai", free: true },

      { d: "2019-04-22", n: "Toinen pääsiäispäivä", free: true },
      { d: "2019-04-27", n: "Kansallinen veteraanipäivä", flag: true },
      { d: "2019-05-01", n: "Vappu", free: true, flag: true },

      { d: "2019-05-09", n: "Eurooppa-päivä", flag: true },
      { d: "2019-05-12", n: "Äitienpäivä", flag: true },
      {
        d: "2019-05-12",
        n: "J.V. Snellmanin ja suomalaisuuden päivä",
        flag: true
      },

      { d: "2019-05-19", n: "Kaatuneiden muistopäivä", flag: true },
      { d: "2019-05-30", n: "Helatorstai", free: true },
      { d: "2019-06-04", n: "Puolustusvoimain lippujuhlan päivä", flag: true },

      { d: "2019-06-09", n: "Helluntai", free: true },
      { d: "2019-06-22", n: "Juhannus", free: true, flag: true },
      { d: "2019-07-06", n: "Eino Leinon päivä", flag: true },

      { d: "2019-10-10", n: "Aleksis Kiven päivä", flag: true },
      { d: "2019-10-24", n: "yhdistyneiden kansakuntien päivä", flag: true },
      { d: "2019-11-02", n: "Pyhäinpäivä", free: true },

      { d: "2019-11-06", n: "Ruotsalaisuuden päivä", flag: true },
      { d: "2019-11-10", n: "Isänpäivä", flag: true },
      { d: "2019-12-06", n: "Itsenäisyyspäivä", free: true, flag: true },

      { d: "2019-12-08", n: "Jean Sibeliuksen päivä", flag: true },
      { d: "2019-12-25", n: "Joulupäivä", free: true },
      { d: "2019-12-26", n: "Tapaninpäivä", free: true }
    ];
  }
}
window.customElements.define(PublicHolidays.is, PublicHolidays);
