import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { errorMessages } from '../common/validators';

import { AuthenticationService } from '../common/services/authentication.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public email: string;
  public password: string;
  private token: string = null;
  public errors = errorMessages;
  public isLoading = false;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createLoginForm();

    if (this.userService.isLogged) {
      this._router.navigate(['']);
    }
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
    if (!this.loginForm.valid) { return; }

    this.isLoading = true;
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    this._authService.loginWithEmail(this.email, this.password)
    .then(res => {
      this._router.navigate(['']);
      this.isLoading = false;
    })
    .catch(err => {
      console.log('Deu ruim');
      console.log(err);

      this.snackBar.open(err.message, 'OK', {
        duration: 4000,
      });
      this.isLoading = false;
    });
  }

}
