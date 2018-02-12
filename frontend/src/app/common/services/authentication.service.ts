import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private token: string;
  private username: string;
  private password: string;

  private lastUser = {
    user: null,
    password: null
  };

  private url = {
    login: environment.API_URL + 'auth/login',
    logout: environment.API_URL + 'auth/logout'
  };

  constructor(private http: HttpClient, private router: Router) { }

  login(username, password) {
    const params = `username=${username}&password=${password}`;
    this.lastUser.user = username;
    this.lastUser.password = password;

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(this.url.login, params, {headers});
  }

  logout() {

  }

}
