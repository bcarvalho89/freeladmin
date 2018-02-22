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
    this.createProfileForm();
  }

  getProfileDetails() {
    this.user = this.userService.getProfile()
  }

  createProfileForm() {
    this.profileForm = this._fb.group({
      displayName: [this.user.displayName, [
          Validators.required
      ]]
    });
  }

  updateProfile() {
    if (!this.profileForm.valid) { return; }

    this.userService.updateProfile(this.profileForm.value)
    .then(res => {
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
