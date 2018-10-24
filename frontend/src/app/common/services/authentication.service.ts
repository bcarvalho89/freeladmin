import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

// import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    // private userService: UserService
  ) { }

  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    // .then(credential => {
    //   console.log('credential', credential);
    //   console.log(this.userService.updateUserData(credential));
    //   this.userService.updateUserData(credential);
    // });
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(() => {
      console.log('logged out');
      this.router.navigate(['/login']);
    });
  }
}
