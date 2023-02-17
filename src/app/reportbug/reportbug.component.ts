import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

declare let Email: any;

@Component({
  selector: "app-reportbug",
  templateUrl: "./reportbug.component.html",
  styleUrls: ["./reportbug.component.css"]
})
export class ReportbugComponent implements OnInit {
  email: FormControl = new FormControl("");
  name: FormControl = new FormControl("");
  subject: FormControl = new FormControl("");
  message: FormControl = new FormControl("");
  private credentials = {
    username: "muhammad.faizan@tritechnologies.com.pk",
    password: "56DD1F78D6BB369753435B4E148F3960A243"
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: this.credentials.username,
      Password: this.credentials.password,
      To: "info@stampasolutions.com",
      From: this.credentials.username,
      Subject: `${this.subject.value}`,
      Body: `FROM: ${this.email.value} <br>
      Name: ${this.name.value} <br>
      BODY: <br/>${(this.message.value as string).replace(/\r\n/g, "<br />").replace(/[\r\n]/g, "<br />")}`
    }).then((message: any) => {
      console.log(message);
      console.log(this.message.value);
      if (message == "OK") this.router.navigate(["/multisite/listWebsites"]);
    });
  }


}
