import { Component, OnInit } from "@angular/core";
import { ContactServiceService } from "../core/services/contact-service.service";
import { contact } from "../core/Model/contact.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private contactServices: ContactServiceService) {}

  ngOnInit() {}
}
