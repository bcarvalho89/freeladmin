import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  public user;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.userService.getProfile()
    .subscribe(res => {
      this.user = res;
      this.createProfileForm();
    });
  }

  createProfileForm() {
    this.profileForm = this._fb.group({
      uid: [{ value: this.user.uid, disabled: true }],
      displayName: [this.user.displayName, [
          Validators.required
      ]],
      email: [{ value: this.user.email, disabled: true }],
      favoriteColor: [this.user.favoriteColor]
    });
  }

  updateProfile() {
    if (!this.profileForm.valid) { return; }

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

}
