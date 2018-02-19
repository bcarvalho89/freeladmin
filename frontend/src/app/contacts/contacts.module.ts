import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ContactService } from '../common/services/contact.service';

import { ContactsComponent } from './contacts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ContactsComponent
  ],
  providers: [
    ContactService
  ]
})
export class ContactsModule { }
