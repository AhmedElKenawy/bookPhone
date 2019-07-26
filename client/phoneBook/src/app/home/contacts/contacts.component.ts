import { Component, OnInit, Input } from "@angular/core";
import { ContactServiceService } from "src/app/core/services/contact-service.service";
import { contact } from "src/app/core/Model/contact.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent implements OnInit {
  constructor(
    private contactsService: ContactServiceService,
    private Router: Router
  ) {}
  @Input() Contacts: Array<contact>;

  ngOnInit() {
    this.contactsService.gelAllContacts().subscribe((data: any) => {
      this.contactsService.updateLocalContacts(data);
    });
  }

  openContact(id: string) {
    this.Router.navigate([`contact/${id}`]);
  }
}
