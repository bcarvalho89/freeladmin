import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

import { AuthenticationService } from '../common/services/authentication.service';

import { AuthGuard } from '../common/guards/auth.guard';

import { AngularFireAuth } from 'angularfire2/auth';

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
    MatSnackBarModule,
    TranslateModule.forChild()
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    AngularFireAuth
  ]
})
export class LoginModule { }
