import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private token: string;
  private username: string;
  private password: string;

  private url = {
    login: environment.API_URL + '/auth/login'
  };

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(email, password) {
    const params = {
      email,
      password
    };

    return this.http.post(this.url.login, params);
  }

  logout() {
    const session = JSON.parse(sessionStorage.getItem('currentUser')) || null;

    if (session) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }

}
