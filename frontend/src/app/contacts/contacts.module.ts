import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

import { ContactService } from '../common/services/contact.service';

import { ContactsComponent } from './contacts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
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
