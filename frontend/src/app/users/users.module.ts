import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { UsersComponent } from './users.component';

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
  ]
})
export class UsersModule { }
