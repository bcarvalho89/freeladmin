import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { errorMessages } from '../common/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  public loginForm: FormGroup;
  public username: string;
  public email: string;
  public errors = errorMessages;

  constructor(private _fb: FormBuilder) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', [
          Validators.required,
          Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  doLogin() {
    // magic here
  }

}
