import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { ToolbarComponent } from './toolbar.component';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    BreadcrumbModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class ToolbarModule { }
