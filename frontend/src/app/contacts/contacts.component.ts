import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatTableDataSource } from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ContactService } from '../common/services/contact.service';
import { Contact } from '../common/domain/contact/contact.model';

import { DialogDelete } from './dialog-delete/dialog-delete.component';
import { DialogContactForm } from './dialog-contact-form/dialog-contact-form.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  // public contactForm: FormGroup;

  // contactList: Contact[];
  public name: string;

  dataSource = new MatTableDataSource();
  displayedColumns = ['name', 'actions'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    // private _fb: FormBuilder,
    private contactService: ContactService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.data = [];
    // this.createContactForm();
    this.contactService.getContacts()
    .subscribe(items => {
      // console.log(items);
      this.dataSource.data = items;
    });
  }

  // createContactForm() {
  //   this.contactForm = this._fb.group({
  //     $key: [{value: null, disabled: true}],
  //     name: ['', [
  //       Validators.required,
  //     ]]
  //   });
  // }

  onSubmit(contactForm: FormGroup) {
    let key = contactForm.getRawValue().$key;

    if(key == null) {
      this.contactService.insertContact(contactForm.value);
    } else {
      this.contactService.updateContact(key, contactForm.value);
    }
    this.resetForm(contactForm);
  }

  // onEdit(contact: Contact, key) {
  //   this.contactForm.setValue({ $key: contact.$key, ...contact });
  // }

  onDelete(key: string) {
    let dialogRef = this.dialog.open(DialogDelete, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.contactService.deleteContact(key);
      }
    });
  }

  openContactForm(data = {}): void {
    // if (data.hasOwnProperty('$key')) {

    // }
    let dialogRef = this.dialog.open(DialogContactForm, {
      width: '400px',
      data: {
        contact: data
      }
    });

    dialogRef.afterClosed().subscribe((form: FormGroup) => {
      if (form && form.valid) {
        this.onSubmit(form);
      }
    });
  }

  showDetails(row) {
    // this.contactService.getContact(row.$key).valueChanges()
    // .subscribe(item => {
    //   // console.log('row subscribe');
    //   const itemWithKey = { $key: row.$key, ...item };
    //   this.openContactForm(itemWithKey);
    // });
  }

  resetForm(contactForm?: FormGroup) {
    if (contactForm != null) {
      contactForm.reset();
    }
  }
}
