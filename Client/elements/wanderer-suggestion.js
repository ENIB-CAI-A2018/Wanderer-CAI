import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-dialog/paper-dialog.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import { CardElement } from './card-element.js'

export class WandererSuggestion extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        #dialog {
          border-radius : 20px;
          padding-top : 20px;
          max-width : 40%;
        }
      </style>

      <!-- shadow DOM goes here -->
      <div class="container">
				<paper-dialog id="dialog" modal>
					<h4>Everything has been seen :(<br>
              Come back soon !</h4>
					<div class="buttons">
						<paper-button dialog-confirm autofocus>Close me !</paper-button>
					</div>
				</paper-dialog>
        <div class="row justify-content-center align-items-center">
          <div class="col-">
            <card-element id="card" name="[[_currentPlace.name]]" country="[[_currentPlace.country]]"
                          images="[[_currentPlace.images]]" lattitude="[[_currentPlace.latitude]]" longitude="[[_currentPlace.longitude]]"
                          info="[[_currentPlace.infos]]">
            </card-element>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      _currentPlace: {
        type : Object,
        readOnly : true
      }
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
    let that = this;
    this.$.card.addEventListener('liked-disliked', function(event) {
      that._getData();
    });
  }

  constructor() {
    super();
    this._index;
    this._places;
    this._getData();
  }

  async _getData() {
    try {
      const response = await fetch(serverAddress + '/places/findRandom' + '?user=' + currentUser.email);
      let rndPlace = await response.json();
      rndPlace.images = rndPlace.images.split("||");
      this._set_currentPlace(rndPlace);
      this.$.card._onElementChange();
    }
    catch (err) {
      console.log('Fetch failed', err);
			this.$.card.disable(true);
			this.$.dialog.open();
    }
  }
}

customElements.define('wanderer-suggestion', WandererSuggestion);
