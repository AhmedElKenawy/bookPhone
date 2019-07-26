import { Injectable } from "@angular/core";
import { APIService } from "./api.service";
import { contact } from "../Model/contact.model";
import { Observable, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactServiceService {
  /**
 * contact service what user can do  

 */
  constructor(private api: APIService) {}

  //api End point path to api service

  path = "contacts/";
  contacts: Array<contact> = [];

  gelAllContacts() {
    return this.api.get(this.path);
  }

  getContactByIdFromServer(id: string) {
    return this.api.get(`${this.path}${id}/`);
  }

  getcontactById(id: string) {
    return this.contacts.find((element, i) => {
      return element.id == id;
    });
  }

  createNewContact(data: any) {
    return this.api.post(this.path, data);
  }

  updateContact(id: string, data: any) {
    return this.api.patch(`${this.path}${id}/`, data);
  }

  searchByName(name: string) {
    let filleter: Array<contact>;
    filleter = this.contacts.filter((el: contact) => {
      return el.name == name;
    });
    return filleter;
  }
  deleteContact(id: string) {
    return this.api.delete(`${this.path}${id}/`);
  }
  updateLocalContacts(contacts: any) {
    contacts.forEach((element, i) => {
      this.contacts[i] = new contact(element);
    });
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].phoneNumber == phoneNumber) return false;
    }
    return true;
  }
}
