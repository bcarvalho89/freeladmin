import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  private url = {
    users: environment.API_URL + '/users',
    profile: environment.API_URL + '/auth/me'
  };

  constructor(
    private http: HttpClient) { }

  public getUsers() {
    return this.http.get(this.url.users);
  }

  public getProfile() {
    return this.http.get(this.url.profile);
  }
}
