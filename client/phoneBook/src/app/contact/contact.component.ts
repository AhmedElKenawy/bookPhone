import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { contact } from "../core/Model/contact.model";
import { ContactServiceService } from "../core/services/contact-service.service";
import { NgForm } from "@angular/forms";

interface contactInfo {
  name: string;
  phoneNumber: string;
}
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  editMode = false;
  id: string;
  user: contactInfo;
  elementIndex: number;
  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private contactServices: ContactServiceService
  ) {}
  NameLessThan3Chr = false;
  ngOnInit() {
    this.route.params.subscribe((parm: Params) => {
      this.id = parm["id"];
      this.contactServices
        .getContactByIdFromServer(this.id)
        .subscribe((res: contactInfo) => {
          this.user = res;
          for (let i = 0; i < this.contactServices.contacts.length; i++) {
            if (this.contactServices.contacts[i].id == this.id)
              this.elementIndex = i;
          }
        });
    });
  }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
  }

  updateContact(f: NgForm) {
    const data: contactInfo = {
      name: f.value.name,
      phoneNumber: f.value.phoneNumber
    };
    if (data.name.length < 3) {
      this.NameLessThan3Chr = true;
    } else {
      this.contactServices.updateContact(this.id, data).subscribe(
        res => {
          this.user = data;
          this.contactServices.contacts[this.elementIndex] = {
            id: this.id,
            name: data.name,
            phoneNumber: data.name
          };
          this.editMode = false;
        },
        err => {
          console.log("error");
        }
      );
    }
  }

  onDelete() {
    this.contactServices
      .deleteContact(this.id)

      .subscribe(
        res => {
          this.contactServices.contacts.splice(this.elementIndex, 1);
          this.Router.navigate(["./"]);
        },
        err => console.log(err)
      );
  }
}
