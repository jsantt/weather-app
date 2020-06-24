import { css, html, LitElement } from 'lit-element';

class FooterSection extends LitElement {
  static get is() {
    return 'footer-section';
  }

  static get styles() {
    return css`
      :host {
        background-color: var(
          --background-color-header,
          var(--background-color)
        );

        color: var(--color-blue-800);
        display: block;
        margin: var(--space-m);
        padding: var(--space-m) 0;
      }

      h3 {
        background-color: var(
          --background-color-header,
          var(--background-color)
        );

        color: var(--color, var(--color-gray-800));
        font-size: var(--font-size-medium);
        font-weight: 600;

        margin: 0;
        padding: var(--space-m) var(--space-l) var(--space-m) var(--space-l);
        text-transform: uppercase;
        font-weight: 900;
      }

      section {
        background-color: var(--background-color-main);
        padding: var(--space-m) var(--space-l);
      }
    `;
  }

  render() {
    return html`
      ${this.header === undefined ? '' : html`<h3>${this.header}</h3>`}
      <section>
        <slot></slot>
      </section>
    `;
  }

  static get properties() {
    return {
      header: {
        type: String,
      },
    };
  }
}

window.customElements.define(FooterSection.is, FooterSection);
