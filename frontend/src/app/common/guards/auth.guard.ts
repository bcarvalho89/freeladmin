
import {tap, map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from "rxjs";




@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
        take(1),
        map(authState => !!authState),
        tap(auth => !auth ? this.router.navigate(['/login']) : true),);
    }
}
