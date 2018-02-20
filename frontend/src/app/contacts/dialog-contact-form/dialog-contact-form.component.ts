import { Component, Inject, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ContactService } from '../../common/services/contact.service';
import { Contact } from '../../common/domain/contact/contact.model';

@Component({
  selector: 'dialog-contact-form',
  templateUrl: './dialog-contact-form.html',
})
export class DialogContactForm implements OnInit {

  public contactForm: FormGroup;
  public userData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogContactForm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit() {
      this.createContactForm();
  }

  createContactForm() {
    this.contactService.getContact(this.data.contact.$key).valueChanges()
      .subscribe(item => {
        if (item != null) {
          this.userData = { $key: this.data.contact.$key, ...item };

          this.contactForm.setValue(this.userData);
        }
      }, error => {
        console.log('error', error);
      })

    this.contactForm = this._fb.group({
      $key: [{value: null, disabled: true}],
      name: [null, [
        Validators.required,
      ]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
