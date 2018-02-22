import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { ProfileComponent } from './profile.component';

import { UserService } from '../common/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    UserService
  ]
})
export class ProfileModule { }
