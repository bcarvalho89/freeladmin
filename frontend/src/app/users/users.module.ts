import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { UsersComponent } from './users.component';
import { UserService } from '../common/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
