import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class AccountForm extends PolymerElement {

  constructor ()
  {
    super();
  }

  getATestCookie() {
    this.createCookie("TEST_COOKIE","TEST_VALUE",25);
  }

  createCookie(name,value,days) {
     if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
     }
     else var expires = "";
     document.cookie = name+"="+value+expires+";";
   }
}
