import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule
} from '@angular/material';

import { DashboardComponent } from './dashboard.component';

import { UserService } from '../common/services/user.service';
import { ContactService } from '../common/services/contact.service';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    UserService,
    ContactService
  ]
})
export class DashboardModule { }
