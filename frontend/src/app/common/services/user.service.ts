
import {of as observableOf,  Observable } from 'rxjs';

import {map, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  avatar?: string;
}

@Injectable()
export class UserService {
  private _user: Observable<User>;
  private itemsCollection: AngularFirestoreCollection<any>;
  userList: Observable<any[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {

    this._user = this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return observableOf(null)
      }
    }));
  }

  public isLogged() {
    this.afAuth.authState.subscribe(res => {
      return true;
    }, err => {
      return false;
    })
  }

  public getProfile() {
    return this._user;
  }

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      favoriteColor: user.favoriteColor
    }

    return userRef.set(data, { merge: true });
  }

  public getUsers() {
    this.itemsCollection = this.afs.collection<any>('users');
    this.userList = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    }));

    return this.userList;
  }

}
