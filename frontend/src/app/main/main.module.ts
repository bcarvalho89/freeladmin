import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { TranslateModule } from '@ngx-translate/core';

import { MainComponent } from './main.component';
import { MainRouting } from './main.routing';

import { ToolbarModule } from '../common/components/toolbar/toolbar.module';
import { AuthInterceptor } from '../common/auth/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ToolbarModule,
    TranslateModule.forChild()
  ],
  declarations: [
    MainComponent
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ]
})
export class MainModule { }
