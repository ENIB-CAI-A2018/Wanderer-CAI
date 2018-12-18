import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import {CardCarousel} from './card-carousel.js'

export class CardElement extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
				:host([disabled]) {
			    color: #a8a8a8;
			    cursor: auto;
			    pointer-events: none;
			  }
        .card-button {
          width: 100px;
          height: 100px;
          border-radius : 1000px;
        }

        paper-icon-button.red {
          color: var(--paper-red-500);
        }
        paper-icon-button.red:hover {
          background-color: var(--paper-red-500);
          color: white;
        }

        paper-icon-button.green {
          color: var(--paper-green-500);
        }
        paper-icon-button.green:hover {
          background-color: var(--paper-green-500);
          color: white;
        }
      </style>

      <!-- shadow DOM goes here -->
      <div class="rounded border shadow-lg px-3 py-3">
        <div class="col">
          <div class="row align-bottom">
            <h1>[[name]], [[country]]</h1>
          </div>
          <card-carousel id="carousel" images="[[images]]" latitude="[[lattitude]]" longitude="[[longitude]]" size="300"></card-carousel>
          <div class="col"  align="center">
            <paper-icon-button id="expandIcon" on-click="expand" class="" icon="expand-more" alt="More"></paper-icon-button>
          </div>
          <div style="display:[[_display]]">
            <template is="dom-repeat" items="[[infos]]">
              <p><b>[[item.title]] :</b> [[item.description]]</p>
            </template>
          </div>
          <div class="row">
            <iron-ajax
            id="AjaxPost"
            url=""
            method="POST"
            content-type="application/json"
            handle-as="json"
            on-response="_handleAjaxPostResponse"
            on-error="_handleAjaxPostError">
            </iron-ajax>
            <div class="col" align="center">
              <paper-icon-button on-click="reject" class="card-button red" icon="clear" alt="Like"></paper-icon-button>
            </div>
            <div class="col" align="center">
              <paper-icon-button on-click="accept" class="card-button green" icon="favorite" alt="Like"></paper-icon-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
      return {
        name : { type : String },
        country : { type : String },
        images : { type : Array },
        lattitude : { type : String },
        longitude : { type : String },
        infos : { type : Array },
        _display : {
          type : String,
          readOnly : true
        },
				disabled: {
	        type: Boolean,
	        notify: true,
	        reflectToAttribute: true
      	}
      };
    }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
  }

  _onElementChange(){
    this.$.carousel._onElementChange();
    this._set_display("none");
    this.$.expandIcon.icon = "expand-more"
  }

  constructor() {
    super();
    this._set_display("none");
  }

	disable(state)
	{
			this.disabled = state;
	}

  accept()
  {
    this.$.AjaxPost.url = serverAddress + "/users/like"
    this.$.AjaxPost.body = { "email": currentUser.email, "place" : this.name };
    this.$.AjaxPost.generateRequest();
  }

  reject()
  {
    this.$.AjaxPost.url = serverAddress + "/users/dislike"
    this.$.AjaxPost.body = { "email": currentUser.email, "place" : this.name };
    this.$.AjaxPost.generateRequest();
  }

  _handleAjaxPostResponse()
  {
    let event = new CustomEvent("liked-disliked", {
      detail: {
        done: true
      }
    });
    this.dispatchEvent(event);
  }

  expand()
  {
    if(this._display=="none"){
      this._set_display("block");
      this.$.expandIcon.icon = "expand-less"
    }
    else{
      this._set_display("none");
      this.$.expandIcon.icon = "expand-more"
    }
  }
}

customElements.define('card-element', CardElement);
