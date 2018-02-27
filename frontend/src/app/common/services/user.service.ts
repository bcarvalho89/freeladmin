import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class UserService {
  private _user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {

    this._user = this.afAuth.authState
    .switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return Observable.of(null)
      }
    });
  }

  public isLogged() {
    this.afAuth.authState.subscribe(res => {
      return true;
    }, err => {
      return false;
    })
  }

  // public currentUserBasicInfo() {
  //   const userCurrent = this.getProfile();
  //   const avatar = userCurrent.photoURL ? userCurrent.photoURL : '/assets/images/profile.jpg';

  //   const userBasicInfo = {
  //     name: userCurrent.displayName,
  //     avatar
  //   };

  //   return userBasicInfo;
  // }

  public getProfile() {
    return this._user;
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     return Observable.of(null);
    //   }
    // });
      // .switchMap(user => {
      //   console.log(user);
      //   if (user) {
      //     return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      //   } else {
      //     return Observable.of(null)
      //   }
      // });
    // return this.afAuth.auth.currentUser.providerData[0];
  }

  // public updateProfile(userData) {
  //   return this.afAuth.auth.currentUser.updateProfile(userData);
  // }

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const avatar = user.photoURL ? user.photoURL : '/assets/images/profile.jpg';

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: avatar,
      favoriteColor: user.favoriteColor
    }

    return userRef.set(data, { merge: true });
  }

}
