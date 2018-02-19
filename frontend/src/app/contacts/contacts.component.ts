import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ContactService } from '../common/services/contact.service';
import { Contact } from '../common/domain/contact/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contactForm: FormGroup;

  contactList: Contact[];
  public name: string;

  constructor(
    private _fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.createContactForm();
    this.contactService.getContacts()
    .subscribe(items => this.contactList = items);
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
    if (confirm('deseja remover') == true) {
      this.contactService.deleteContact(key);
    }
  }

  getDetails(key: string) {
   this.contactService.getContact(key).valueChanges()
  .subscribe(item => console.log(item));
  }

  resetForm(contactForm?: FormGroup) {
    if (contactForm != null) {
      contactForm.reset();
    }
  }
}
