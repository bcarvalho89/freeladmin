import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRouting,
    RouterModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { }
