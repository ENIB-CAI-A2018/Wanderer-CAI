import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import { WandererSuggestion } from './wanderer-suggestion.js'

class MyView1 extends PageViewElement {
  render() {
    return html`
      <wanderer-suggestion></wanderer-suggestion>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
