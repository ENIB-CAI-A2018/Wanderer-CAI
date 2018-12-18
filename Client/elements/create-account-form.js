import { html } from '@polymer/polymer/polymer-element.js';
import { AccountForm } from './account-form.js'

export class CreateAccountForm extends AccountForm {

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
        <iron-form id="signInForm" on-iron-form-response="responseHandler" on-iron-form-error="errorHandler">
          <form action="[[_formAction]]" method="post">
            <paper-input required on-input="inputChange" id="firstName" type="text" name="firstName" label="First Name"></paper-input>
            <paper-input required on-input="inputChange" id="lastName" type="text" name="lastName" label="Last Name"></paper-input>
            <paper-input required on-input="inputChange" id="email" type="text" name="email" label="Email"></paper-input>
            <paper-input required on-input="inputChange" id="password" type="password" name="password" label="Password"></paper-input>
            <paper-input required on-input="inputChange" id="password_check" type="password" label="Password Check"></paper-input>
            <paper-button disabled id="signInButton" raised on-click="signInFormSubmit">Sign In</paper-button>
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
    if(this.$.firstName.value!="" && this.$.lastName.value!="" && this.$.email.value!="" && this.$.password.value!="" && this.$.password.value==this.$.password_check.value)
    {
        this.$.signInButton.disabled = false;
    }
    else this.$.signInButton.disabled = true;
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
    this.$.signInForm.reset();
    this.$.signInButton.disabled = true;
  }

  signInFormSubmit() {
    this.email = this.$.email.value;
    this.$.signInForm.submit();
    this.resetForm();
  }

  ready() {
    super.ready();
    let that = this;
    this.$.signInForm.addEventListener('iron-form-presubmit', function(event) {
      //
    });
  }

  constructor() {
    super();
    this.email;
    this._set_formAction(serverAddress + "/users/signin");
  }

}

customElements.define('create-account-form', CreateAccountForm);
