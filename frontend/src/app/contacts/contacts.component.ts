import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatTableDataSource } from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ContactService } from '../common/services/contact.service';
import { Contact } from '../common/domain/contact/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contactForm: FormGroup;

  // contactList: Contact[];
  public name: string;

  dataSource = new MatTableDataSource();
  displayedColumns = ['name', 'actions'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private _fb: FormBuilder,
    private contactService: ContactService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.createContactForm();
    this.contactService.getContacts()
    .subscribe(items => {
      console.log(items);
      this.dataSource.data = items;
    });
  }

  createContactForm() {
    this.contactForm = this._fb.group({
      $key: [{value: null, disabled: true}],
      name: ['', [
        Validators.required,
      ]]
    });
  }

  onSubmit(contactForm: FormGroup) {
    let key = this.contactForm.getRawValue().$key;

    if(key == null) {
      this.contactService.insertContact(contactForm.value);
    } else {
      this.contactService.updateContact(key, this.contactForm.value);
    }
    this.resetForm(contactForm);
  }

  onEdit(contact: Contact, key) {
    this.contactForm.setValue({ $key: contact.$key, ...contact });
  }

  onDelete(key: string) {
    let dialogRef = this.dialog.open(DeleteContactDiaglog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.contactService.deleteContact(key);
      }
    });
  }

  showDetails(row) {
   this.contactService.getContact(row.$key).valueChanges()
  .subscribe(item => console.log(item));
  }

  resetForm(contactForm?: FormGroup) {
    if (contactForm != null) {
      contactForm.reset();
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Confirm</h1>
  <div mat-dialog-content>
    <p>Are you sure you want to delete?</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button color="warn" mat-dialog-close="{{ true }}">Confirm</button>
    <button mat-button (click)="onNoClick()">Cancel</button>
  </div>`,
})
export class DeleteContactDiaglog {

  constructor(
    public dialogRef: MatDialogRef<DeleteContactDiaglog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
