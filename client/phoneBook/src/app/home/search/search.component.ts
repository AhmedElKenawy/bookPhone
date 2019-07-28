import { Component, OnInit, Output } from "@angular/core";
import { ContactServiceService } from "src/app/core/services/contact-service.service";
import { contact } from "src/app/core/Model/contact.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  constructor(private contactService: ContactServiceService) {}
  NoContact = false;
  backHome: boolean = false;
  @Output() result: Array<contact> = this.contactService.contacts;
  ngOnInit() {}

  search(form: NgForm) {
    this.NoContact = false;

    const searchValue = form.value.searchValue;

    this.contactService.search(searchValue).subscribe(res => {
      this.result = res;
      if (this.result.length == 0) {
        this.NoContact = true;
      }
    });

    this.backHome = true;
  }

  back() {
    this.result = this.contactService.contacts;
    this.NoContact = false;
    this.backHome = false;
  }
}
