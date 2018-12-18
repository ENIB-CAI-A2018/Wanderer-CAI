import { LitElement, html } from '@polymer/lit-element';

// These are the elements needed by this element.
import { LoginMain } from './login-main.js';

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <login-main></login-main>
    `;
  }

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }
}

window.customElements.define('my-app', MyApp);
