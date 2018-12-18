import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class CardCarousel extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .card-side-button {
          height : 100%;
        }

        .card-radio-button {
          height : 30px;
          width : 30px;
        }
        .grey-button {
          color : #B1B4B8;
        }
      </style>

      <!-- shadow DOM goes here -->
      <div class="row my-3">
        <div class="col px-0 mx-0">
          <paper-button on-click="setLeftImage" class="card-side-button"><iron-icon icon="chevron-left" alt="Left"></iron-icon></paper-button>
        </div>
        <div class="col px-0 mx-0">
          <img id="cardImage" class="rounded" width="[[size]]" height="[[size]]" src="[[_currentImage]]"><img>
        </div>
        <div class="col px-0 mx-0">
          <paper-button on-click="setRightImage" class="card-side-button"><iron-icon icon="chevron-right" alt="Left"></iron-icon></paper-button>
        </div>
      </div>
      <div class="row">
        <div style="float: none; margin: 0 auto;">
          <template id="radioRepeat" is="dom-repeat" items="[[images]]">
            <iron-icon id="radio[[index]]" class="card-radio-button grey-button" icon="[[_getRadioIcon(index,_currentIndex)]]"></iron-icon>
          </template>
        </div>
      </div>

    `;
  }

  static get properties() {
      return {
        images : { type : Array, },
        _currentIndex : {
          type : Number,
          readOnly : true,
        },
        _currentImage : {
          type : String,
          readOnly : true,
        },
        lattitude : { type : String },
        longitude : { type : String },
        size : { type : String }
      };
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
    this.images;
    this._set_currentIndex(0);
  }

  async _onElementChange(){
    this.resetImage();
  }

  setLeftImage() {
    this._set_currentIndex(this._currentIndex-1);
    if(this._currentIndex<0) this._set_currentIndex(this.images.length - 1);
    this.setImage();
  }

  setRightImage() {
    this._set_currentIndex(this._currentIndex+1);
    if(this._currentIndex>=this.images.length) this._set_currentIndex(0);
    this.setImage();
  }

  resetImage() {
    this._set_currentIndex(0);
    this.setImage();
  }

  setImage() {
    this._set_currentImage(serverAddress + this.images[this._currentIndex]);
  }

  _getRadioIcon(index,currentIndex)
  {
    let icon = index==currentIndex?"radio-button-checked":"radio-button-unchecked"
    return icon
  }
}

customElements.define('card-carousel', CardCarousel);
