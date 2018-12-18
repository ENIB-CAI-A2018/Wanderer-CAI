import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import { CreateAccountForm } from './create-account-form.js';
import { LogAccountForm } from './log-account-form.js';

export class LoginMain extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .main {
          height : 100vh;
        }
        .header {
          height : 10%;
          text-align : center;
        }
        .footer {
          height : 10%;
          text-align : center;
        }
        .title {
          color : white;
          font-size : 3em;
          font-family: 'Courgette', cursive;
        }
        .text {
          color : white;
          font-size : 1.2em;
          font-family: 'Courgette', cursive;
        }
        .full-height {
          height : 80%;
        }
        .col-center {
          margin-top : 50%;
        }
        .container-full {
          margin: 0 auto;
          padding : 0 10%;
          width: 100%;
        }
        .main-button {
          background-color : #000000;
          min-width : 200px;
          width : 15%;
          color : white;
          border : solid 2px white;
          border-radius : 1000px;
          font-size : 130%;
        }
        #canvas {
          z-index: -1;
          position: absolute;
          left: 0;
          top: 0;
        }
      </style>
      <div class="container-full main">
        <canvas id="canvas" width="16" height="9"></canvas>
        <div class="header">
          <div class="title">Wanderer</div>
        </div>
        <div class="row full-height">
          <div class="col" align="center">
            <button class="main-button col-center" on-click="displayLogin" style="display:[[_displayLoginButton]];">Log in</button>
            <log-account-form style="display:[[_displayLogin]];"></log-account-form>
          </div>
          <div class="col" align="center">
            <button class="main-button col-center" on-click="displaySignin" style="display:[[_displaySigninButton]];">Sign in</button>
            <create-account-form style="display:[[_displaySignin]];"></create-account-form>
          </div>
        </div>
        <div class="footer">
          <div class="text">Work in Progress</div>
          <div class="text">ENIB @ 2018</div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      _displayLogin :
      {
        type : String,
        readOnly : true
      },
      _displaySignin :
      {
        type : String,
        readOnly : true
      },
      _displayLoginButton :
      {
        type : String,
        readOnly : true
      },
      _displaySigninButton :
      {
        type : String,
        readOnly : true
      }
    }
  }

  displayLogin()
  {
    if(this._displayLogin=="none")
    {
      this._set_displayLogin("block");
      this._set_displayLoginButton("none");
    }
    else
    {
      this._set_displayLogin("none");
      this._set_displayLoginButton("block");
    }
  }

  displaySignin()
  {
    if(this._displaySignin=="none")
    {
      this._set_displaySignin("block");
      this._set_displaySigninButton("none");
    }
    else
    {
      this._set_displaySignin("none");
      this._set_displaySigninButton("block");
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
    let canvas = this.$.canvas;
    let context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height)
    let img = new Image;
    img.src = '../images/world_map.svg';
    img.onload = function() {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  constructor() {
    super();
    this._set_displayLogin("none");
    this._set_displaySignin("none");
    this._set_displayLoginButton("block");
    this._set_displaySigninButton("block");
  }

}

customElements.define('login-main', LoginMain);
