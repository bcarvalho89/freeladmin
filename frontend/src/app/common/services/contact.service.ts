import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Contact } from '../domain/contact/contact.model';

@Injectable()
export class ContactService {
  private itemsCollection: AngularFirestoreCollection<Contact>;
  private itemDoc: AngularFirestoreDocument<Contact>;

  item: Observable<Contact>;

  contactList: Observable<Contact[]>;
  selectedContact: Contact = new Contact();

  constructor(
    private firebase: AngularFirestore
  ) {
    this.itemsCollection = this.firebase.collection<Contact>('contacts');
  }

  getContacts() {
    this.contactList = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      });
    });

    return this.contactList;
  }

  getSummary() {
    return this.itemsCollection.snapshotChanges();
  }

  getContact(id) {
    return this.firebase.doc<Contact>('contacts/' + id);
  }

  insertContact(contact: Contact) {
    this.itemsCollection.add(contact);
  }

  updateContact(key: string, contact: Contact) {
    this.getContact(key).update(contact);
  }

  deleteContact($key: string) {
    this.getContact($key).delete()
  }

}
