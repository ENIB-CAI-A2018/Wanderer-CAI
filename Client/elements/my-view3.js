import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import { WandererProfile } from './wanderer-profile.js'

class MyView3 extends PageViewElement {
  render() {
    return html`
      <wanderer-profile></wanderer-profile>
    `;
  }

  constructor() {
    super();
  }
	
}

window.customElements.define('my-view3', MyView3);
