import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileComponent } from './profile.component';

import { UserService } from '../common/services/user.service';

@NgModule({
  imports: [
    CommonModule,
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
