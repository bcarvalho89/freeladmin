import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { errorMessages } from '../common/validators';

import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  public loginForm: FormGroup;
  public username: string;
  public password: string;
  public errors = errorMessages;
  public isLoading = false;

  constructor(private _fb: FormBuilder, private _authService: AuthenticationService) {
    this.createLoginForm();
  }

  private createLoginForm() {
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
    this.isLoading = true;
    this.username = 'dante';
    this.password = 'gudiao';

    this._authService.login(this.username, this.password)
      .subscribe((res: any) => {
        console.log(res);
        this.isLoading = false;
      }, (err => {
        console.log('Deu ruim');
        console.log(err);
        this.isLoading = false;
      }));
  }

}
