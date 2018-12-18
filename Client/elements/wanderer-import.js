import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import { ImportForm } from './import-form.js'

export class WandererImport extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <!-- shadow DOM goes here -->
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-">
            <import-form id="form" ></import-form>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
  }

  constructor() {
    super();
  }
}

customElements.define('wanderer-import', WandererImport);
