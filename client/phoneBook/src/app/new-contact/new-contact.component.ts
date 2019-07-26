import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ContactServiceService } from "../core/services/contact-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-contact",
  templateUrl: "./new-contact.component.html",
  styleUrls: ["./new-contact.component.scss"]
})
export class NewContactComponent implements OnInit {
  constructor(
    private contactService: ContactServiceService,
    private router: Router
  ) {}

  ngOnInit() {}
  phoneNotUnique = false;
  NameLessThan3Chr = false;
  newContact(form: NgForm) {
    this.NameLessThan3Chr = false;
    this.phoneNotUnique = false;
    const NewContact: {
      name: string;
      phoneNumber: string;
    } = {
      name: form.value.name,
      phoneNumber: form.value.phoneNumber
    };

    if (NewContact.name.length < 3) {
      this.NameLessThan3Chr = true;
    } else {
      if (this.contactService.validatePhoneNumber(NewContact.phoneNumber)) {
        this.contactService.createNewContact(NewContact).subscribe(
          res => {
            this.router.navigate([`contact/${res.id}`]);
          },

          err => console.log(err)
        );
        this.phoneNotUnique = false;
      } else {
        this.phoneNotUnique = true;
      }
    }
  }
}
