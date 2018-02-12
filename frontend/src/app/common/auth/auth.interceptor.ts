import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.auth.getToken()) {
      return next.handle(req);
    } else {
      const request = req.clone({
       setHeaders: {
         'Content-Type': 'application/json',
         'x-access-token': JSON.parse(this.auth.getToken()).token
        }
      });

      return next.handle(request);
    }
  }
}
