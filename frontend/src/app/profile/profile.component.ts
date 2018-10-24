import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../common/services/user.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  uploadPercent: Observable<number>;
  profileUrl: Observable<string | null>;

  public user;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.userService.getProfile()
    .subscribe(res => {
      const profileUrlRef = this.afStorage.ref(res.photoURL);

      profileUrlRef.getDownloadURL()
      .subscribe(userImage => {
        res = { avatar: userImage, ...res };

        this.user = res;
        this.createProfileForm();
      });

    });
  }

  createProfileForm() {
    this.profileForm = this._fb.group({
      uid: [{ value: this.user.uid ? this.user.uid : null, disabled: true }],
      displayName: [this.user.displayName, [
          Validators.required
      ]],
      email: [{ value: this.user.email, disabled: true }],
      photoURL: [{ value: null, disabled: true }],
      favoriteColor: [this.user.favoriteColor]
    });
  }

  updateProfile() {
    if (!this.profileForm.valid) { return; }

    console.log(this.profileForm.getRawValue());

    this.userService.updateUserData(this.profileForm.getRawValue())
    .then(() => {
      this.snackBar.open('Atualizado com sucesso', 'OK', {
        duration: 4000,
      });
    })
    .catch(err => {
      console.log('Deu ruim');
      console.log(err);

      this.snackBar.open(err.message, 'OK', {
        duration: 4000,
      });
    });
  }

  upload(event) {
    const uid = this.profileForm.get('uid').value;
    const file = event.target.files[0];
    const filePath = uid + '/profile';
    const ref = this.afStorage.ref(filePath);
    const task = ref.put(file, { customMetadata: { uid } });
    this.uploadPercent = task.percentageChanges();

    ref.getDownloadURL()
    .subscribe(res => {
      this.profileUrl = res;
      this.profileForm.get('photoURL').setValue(filePath);
    });
  }

}
