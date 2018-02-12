import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

import { AuthenticationService } from '../common/services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRouting,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    TranslateModule.forChild()
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class LoginModule { }
