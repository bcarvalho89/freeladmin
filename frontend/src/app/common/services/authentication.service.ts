import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(() => {
      console.log('logged out');
      this.router.navigate(['/login']);
    });
  }
}
