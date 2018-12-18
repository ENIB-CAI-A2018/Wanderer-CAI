import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import { ImportCrop } from './import-crop.js'

export class ImportForm extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        #dialog {
          border-radius : 20px;
          padding-top : 20px;
          max-width : 40%;
        }
        .info {
          border : solid 1px grey;
          padding-left : 10px;
          padding-right : 10px;
        }
      </style>

      <!-- shadow DOM goes here -->
      <div class="rounded border shadow-lg px-3 py-3">
        <paper-dialog id="dialog" modal>
          <h4>[[_dialogText]]</h4>
          <div class="buttons">
            <paper-button dialog-confirm autofocus>Close me !</paper-button>
          </div>
        </paper-dialog>
        <iron-form id="searchForm" style="display:[[_displaySearch]]">
          <form method="get">
            <paper-input id="searchInput" type="text" name="name" required label="Name"></paper-input>
            <paper-button raised on-click="searchFormSubmit">Search</paper-button>
          </form>
          <div class="output"></div>
        </iron-form>
        <iron-form id="createForm" style="display:[[_displayCreate]]">
          <form action="[[_formAction]]" method="post">
            <paper-input type="text" name="name" required label="Name" readonly value=[[currentPlace]]></paper-input>
            <paper-input type="text" name="country" label="Country"></paper-input>
            <paper-input type="text" name="latitude" label="Latitude"></paper-input>
            <paper-input type="text" name="longitude" label="Longitude"></paper-input>
            <import-crop id="importCropElement"></import-crop>
            <template is="dom-repeat" items="[[infos]]">
              <div class="info my-1">
                <paper-input type="text" name="infoTitle[[index]]" label="Info title"></paper-input>
                <paper-input type="text" name="infoDescription[[index]]" label="Info description"></paper-input>
              </div>
            </template>
            <paper-button id="addInfo" on-click="onAddInfo">Add info<iron-icon icon="add"></iron-icon></paper-button><br>
            <paper-button disabled id="createButton" raised on-click="createFormSubmit">Create</paper-button>
          </form>
        </iron-form>
      </div>
    `;
  }

  static get properties() {
    return {
      _displaySearch : {
        type : String,
        readOnly : true
      },
      _displayCreate : {
        type : String,
        readOnly : true
      },
      infos : {
        type : Array
      },
      currentPlace : {
        type : String
      },
      _formAction : {
        type : String,
        readOnly : true
      },
      _dialogText : {
        type : String,
        readOnly : true
      }
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  resetForm()
  {
    this.$.createForm.reset();
    this.$.importCropElement.reset();
    this.place = "";
    this.$.searchForm.reset();
    this.$.createButton.disabled = true;
    this.set('infos', []);
    this.deployForm(false);
  }

  searchFormSubmit() {
    this._getSearchResult();
  }

  createFormSubmit() {
    this.$.createForm.submit();
    this.resetForm();
  }

  onAddInfo() {
    this.set('infos', this.infos.concat([0]));
  }

  deployForm(state)
  {
    if(state)
    {
      this._set_displaySearch("none");
      this._set_displayCreate("block");
    }
    else
    {
      this._set_displaySearch("block");
      this._set_displayCreate("none");
    }
  }

  async _getSearchResult() {
    try {
      if(this.$.searchInput.value)
      {
        const response = await fetch(serverAddress + '/places/find/'+this.$.searchInput.value);
        this.place = await response.json();
        if(Object.keys(this.place).length)
        {
          this._set_dialogText("This place already exists !");
          this.$.dialog.open();
        }
        else
        {
          this.deployForm(true);
          this.currentPlace = this.$.searchInput.value;
        }
      }
      else
      {
        this._set_dialogText("Please enter a name !");
        this.$.dialog.open();
      }
    }
    catch (err) {
      console.log('Fetch failed', err);
    }
  }

  ready() {
    super.ready();
    let that = this;
    this.$.createForm.addEventListener('iron-form-presubmit', function(event) {
      let imagesData = that.$.importCropElement.getImages();
      if(imagesData.length>0 && imagesData.length<=4)
      {
        for(let i=0; i<imagesData.length;i++)
        {
          this.request.body["image"+i]=imagesData[i];
        }
      }
    });
    this.$.importCropElement.addEventListener('images-changed', function(event) {
      if(event.detail.length>0 && event.detail.length<=4)
      {
        that.$.createButton.disabled = false;
      }
      else that.$.createButton.disabled = true;
    });
  }

  constructor() {
    super();
    this.infos = [];
    this.place = "";
    this._set_formAction(serverAddress + "/places/create");
    this.deployForm(false);
  }

}

customElements.define('import-form', ImportForm);
