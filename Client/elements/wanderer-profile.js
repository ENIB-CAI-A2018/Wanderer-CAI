import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import { ProfileCard } from './profile-card.js'

export class WandererProfile extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <!-- shadow DOM goes here -->
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-">
            <profile-card id="profileCard" fname="[[_user.lastName]]" lname="[[_user.firstName]]" email="[[_user.email]]" likedPlaces="[[_user.likes]]" dislikedPlaces="[[_user.dislikes]]"></profile-card>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      _user : {
        type : Object,
				readOnly : true
      },
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
		this._set_user(currentUser);
		this.$.profileCard.updateInterests(this._user.likes,this._user.dislikes)
  }

  constructor() {
    super();
    this._user;
  }
}

customElements.define('wanderer-profile', WandererProfile);
