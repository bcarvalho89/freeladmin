import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MainComponent } from './main.component';
import { MainRouting } from './main.routing';

import { AuthService } from '../common/auth/auth.service';
import { UserService } from '../common/services/user.service';
import { AuthInterceptor } from '../common/auth/auth.interceptor';

@NgModule({
  imports: [
    MainRouting,
    RouterModule
  ],
  declarations: [
    MainComponent
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class MainModule { }
