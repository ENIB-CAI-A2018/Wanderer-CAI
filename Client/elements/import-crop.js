import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-button/paper-button.js';

import '@github/image-crop-element/dist/index.esm.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class ImportCrop extends PolymerElement {

  static get template() {
    return html`
      <link href="../node_modules/@github/image-crop-element/index.css" rel="stylesheet">
      <style include="granite-bootstrap"></style>
      <style>
        .preview-icon {
          max-width:50px;
        }
        input[type="file"] {
            display: none;
        }
        .custom-file-upload {
            border: 1px solid #ccc;
            display: inline-block;
            padding: 6px 12px;
            cursor: pointer;
        }
        #cropTool {
          min-width:400px;
          max-width:400px;
        }
      </style>

      <!-- shadow DOM goes here -->
      <div class="py-2">
        <label  class="custom-file-upload" for="uploadInputElement" class="custom-file-upload">Upload Image</label>
        <input id="uploadInputElement" type="file" accept=".jpg, .jpeg, .png" multiple>
        <paper-button raised id="cropButton" on-click="getCroppedImage">Crop Image</paper-button>
        <image-crop id="cropTool" src="">
          <input disabled id="cropX" type="hidden" data-image-crop-input="x" name="x">
          <input disabled id="cropY" type="hidden" data-image-crop-input="y" name="y">
          <input disabled id="cropW" type="hidden" data-image-crop-input="width" name="width">
          <input disabled id="cropH" type="hidden" data-image-crop-input="height" name="height">
        </image-crop>
        <template is="dom-repeat" items="[[resultImages]]">
          <img src="[[item]]" class="preview-icon">
        </template>
      </div>
    `;
  }

  static get properties() {
    return {
      resultImages : {
        type : Array,
        notify : true
      }
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  getCroppedImage()
  {
    if(this.$.uploadInputElement.files.length!=0 && this.nbCroppedImages<=3)
    {
      let canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      canvas.getContext('2d').drawImage(this.shadowRoot.querySelector('.crop-image'),
                                        this.$.cropX.value, this.$.cropY.value,
                                        this.$.cropW.value,this.$.cropH.value,
                                        0,0,canvas.width,canvas.height);

      this.resultImages[this.nbCroppedImages]=canvas.toDataURL();
      this.notifyPath('resultImages.'+this.nbCroppedImages, this.resultImages[this.nbCroppedImages]);
      this.nbCroppedImages++;
      let event = new CustomEvent("images-changed", {
        detail: {
          length: this.nbCroppedImages
        }
      });
      this.dispatchEvent(event);
      if(this.nbCroppedImages==4)
      {
        this.$.uploadInputElement.disabled=true;
      }
    }
  }

  getImages() {
    let tmpImages = [];
    for(let i of this.resultImages)
    {
      if(i!=this.blankImage)
      {
        tmpImages.push(i);
      }
    }
    return tmpImages;
  }

  ready() {
    super.ready();
    let that = this;
    this.$.uploadInputElement.addEventListener('change', function(){
      if(that.nbCroppedImages<=3)
      {
        let currentFile = this.files[0];
        that.shadowRoot.querySelector('.crop-image').src = window.URL.createObjectURL(currentFile);
      }
    });
  }

  constructor() {
    super();
    this.blankImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABXUlEQVQ4T43TPUuXYRTH8Y8ptUiLCE6pkOLQJCj4DqIQXESU3APTRhO0oAdXiRSbnOIfziHkC3DULRAyBaFBxISiQVviwHXJxd2dek035/zO9zzc5zT59/XiPrpxA834g318xtcypKkS/widSXiAH8nfluwPEqiR40rADL5ho6aq0jSMO1gJYwZE5tNrBGdQQFrxMQDR8yjeVDJPYhEteJe+S8lzNAIQpW9hu/DexHf04yf2cA9HhWYQgwFYwqtiYFlzC2e4nWbTh5MC0I5nAXiLp5cMbi1lnqvRLAdgGU/+A3iIlxjCeY1mNbfwulJe1j5GtBJVVl+0MBuA6TTEnRpR9B2b+KXGN4CBAPRgDFFF9S2kCuZrfC/wIS/SBH7h0xVbmN0jCbxervIUDq8BieAOvC9XOZPHU0txdXFMx8kRA+tCHNMu1uuOKdvuFuccfyCG+Dtd4WZaqotO/wJFBT9yrx+wCgAAAABJRU5ErkJggg==";
    this.nbCroppedImages = 0;
    this.resultImages = [this.blankImage,this.blankImage,this.blankImage,this.blankImage];
  }

  reset() {
    this.nbCroppedImages = 0;
    this.resultImages = [this.blankImage,this.blankImage,this.blankImage,this.blankImage];
    this.shadowRoot.querySelector('.crop-image').src = "";
    this.$.uploadInputElement.value = "";
  }

}

customElements.define('import-crop', ImportCrop);
