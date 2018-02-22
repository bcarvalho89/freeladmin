import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  public isLogged() {
    this.afAuth.authState.subscribe(res => {
      return true;
    }, err => {
      return false;
    })
  }

  public currentUserBasicInfo() {
    const userCurrent = this.getProfile();
    const avatar = userCurrent.photoURL ? userCurrent.photoURL : '/assets/images/profile.jpg';

    const userBasicInfo = {
      name: userCurrent.displayName,
      avatar
    };

    return userBasicInfo;
  }

  public getProfile() {
    return this.afAuth.auth.currentUser.providerData[0];
  }

  public updateProfile(userData) {
    return this.afAuth.auth.currentUser.updateProfile(userData);
  }

  // public getUsers() {
  //   return this.http.get(this.url.users);
  // }

  // public getProfile() {
  //   return this.http.get(this.url.profile);
  // }

  // public getProfileFirebase()/*: Observable<any>*/ {
  //   this.auth.auth.currentUser.updateProfile({
  //     displayName: 'TEste',
  //     photoURL: null
  //   });

  //   console.log(this.auth.auth.currentUser);

  //   // return this.auth.authState;

  //   return {
  //     name: 'Teste',
  //     email: 'teste@teste',
  //     avatar: ''
  //   }
  // }
}
