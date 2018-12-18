import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-button/paper-button.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class ProfileCard extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
			h5 {
				color : grey;
			}

      .text-tag {
        margin-top : 5%;
        margin-bottom : 0;
      }
      .input-tag {
        margin-bottom : 10%;
      }
			.interest-box {
				margin : 5%;
				max-height : 200px;
				overflow-y: scroll;
			}
      .icon {
        max-width : 30px;
        max-height : 30px;
      }
      .place-list-item {
        margin:2%;
      }
      #disconnectButton:hover {
        background-color: var(--paper-red-500);
        color: white;
      }
      </style>

      <!-- shadow DOM goes here -->
      <div class="rounded border shadow-lg px-3 py-3">
        <div class="title">
          <paper-button id="disconnectButton" raised on-click="disconnect">Disconnect</paper-button>
          <paper-input label="Name :" class="input-tag" value="[[fname]] [[lname]]" readonly></paper-input>
          <paper-input label="Email :" class="input-tag" value="[[email]]" readonly></paper-input>
					<h5>Disliked places</h5>
					<div class="interest-box">
						<template id="likedPlacesRepeat" is="dom-repeat" items="[[likedPlaces]]">
              <div class="place-list-item">
                <img class="icon" src="http://localhost:8080/images/[[item]]0.png"> <b>[[item]]</b>
              </div>
						</template>
					</div>
					<h5>Liked places</h5>
					<div class="interest-box">
						<template id="dislikedPlacesRepeat" is="dom-repeat" items="[[dislikedPlaces]]">
              <div class="place-list-item">
                <img class="icon" src="http://localhost:8080/images/[[item]]0.png"> <b>[[item]]</b>
              </div>
						</template>
					</div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      fname : {
        type : String
      },
      lname : {
        type : String
      },
      email : {
        type : String
      },
			likedPlaces : {
				type : Array
			},
			dislikedPlaces : {
				type : Array
			}
    };
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

	updateInterests(likes,dislikes)
	{
		this.likedPlaces = likes;
		this.dislikedPlaces = dislikes;
	}

  disconnect() {
    document.cookie = "WandererAppCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		location.reload();
  }

  ready() {
    super.ready();
  }

  constructor() {
    super();
  }
}

customElements.define('profile-card', ProfileCard);
