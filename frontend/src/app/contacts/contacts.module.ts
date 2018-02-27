import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';

import { ContactService } from '../common/services/contact.service';

import { ContactsComponent } from './contacts.component';
import { DialogDelete } from './dialog-delete/dialog-delete.component';
import { DialogContactForm } from './dialog-contact-form/dialog-contact-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    TranslateModule.forChild()
  ],
  entryComponents: [
    DialogDelete,
    DialogContactForm
  ],
  declarations: [
    ContactsComponent,
    DialogDelete,
    DialogContactForm
  ],
  providers: [
    ContactService
  ]
})
export class ContactsModule { }
