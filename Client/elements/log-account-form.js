import { html } from '@polymer/polymer/polymer-element.js';
import { AccountForm } from './account-form.js'

export class LogAccountForm extends AccountForm {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
          .card{
          background-color : white;
          text-align : left;
        }
        .
      </style>

      <!-- shadow DOM goes here -->
      <div class="card rounded border shadow-lg px-3 py-3">
        <iron-form id="LogInForm" on-iron-form-response="responseHandler" on-iron-form-error="errorHandler">
          <form action="[[_formAction]]" method="post">
            <paper-input required on-input="inputChange" id="email" type="text" name="email" label="Email"></paper-input>
            <paper-input required on-input="inputChange" id="password" type="password" name="password" label="Password"></paper-input>
            <paper-button disabled id="LogInButton" raised on-click="LogInFormSubmit">Log In</paper-button>
          </form>
        </iron-form>
      </div>
    `;
  }

  static get properties() {
    return {
      _formAction : {
        type : String,
        readOnly : true
      }
    }
  }

  inputChange()
  {
    if(this.$.email.value!="" && this.$.password.value!="")
    {
        this.$.LogInButton.disabled = false;
    }
    else this.$.LogInButton.disabled = true;
  }

  responseHandler(rep)
  {
    if(rep)
    {
      this.createCookie("WandererAppCookie",this.email,15);
      location.reload();
    }
  }

  errorHandler(err)
  {
    alert("ERROR");
  }

  resetForm()
  {
    this.$.LogInForm.reset();
    this.$.LogInButton.disabled = true;
  }

  LogInFormSubmit() {
    this.email = this.$.email.value;
    this.$.LogInForm.submit();
    this.resetForm();
  }

  ready() {
    super.ready();
    let that = this;
    this.$.LogInForm.addEventListener('iron-form-presubmit', function(event) {
      //
    });
  }

  constructor() {
    super();
    this.email;
    this._set_formAction(serverAddress + "/users/login");
  }

}

customElements.define('log-account-form', LogAccountForm);
