import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the elements needed by this element.
import { WandererImport } from './wanderer-import.js'

class MyView2 extends PageViewElement {
  render() {
    return html`
      <wanderer-import></wanderer-import>
    `;
  }

  static get properties() { return {
  }}

  constructor() {
    super();
  }
}

window.customElements.define('my-view2', MyView2);
