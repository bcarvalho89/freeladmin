import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { errorMessages } from '../common/validators';

import { AuthenticationService } from '../common/services/authentication.service';

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
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private snackBar: MatSnackBar) {
    this.createLoginForm();
  }

  ngOnInit() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    if (this.token) {
      this._router.navigate(['/main']);
    }

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
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    this._authService.login(this.email, this.password)
      .subscribe((res: any) => {

        const token = res && res.token;

        if (token) {
          sessionStorage.setItem('currentUser', JSON.stringify({ email: this.email, token: res.token }));
          this._router.navigate(['/main']);
        }

        this.isLoading = false;

      }, (err => {
        console.log('Deu ruim');
        console.log(err);

        this.snackBar.open(err.error.message, 'OK', {
          duration: 4000,
        });
        this.isLoading = false;
      }));
  }

}
