import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
// import {AuthserviceService} from '../authservice.service';
import {OrganizationService} from '../Services/organization.service';
import {IUser} from "../Interfaces/user_interface";
import {blur} from "ngx-editor/lib/plugins";


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']

})

@Injectable()
export class OrganizationComponent implements OnInit {
  router: Router;
  organizationService: OrganizationService;
  private user: IUser = {Password: "", UserName: ""};
  @ViewChild('disp') disp?: ElementRef;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(_router: Router, organizationService: OrganizationService,
              private route: ActivatedRoute) {// , blogService:BlogsService) {
    this.organizationService = organizationService;
    // this.blogsService = blogService;
    this.router = _router;
  }


  ngOnInit(): void {
    console.log('In organization component');
    this.organizationService.isAuthenticated = false;  
  }


  authorize() {
    // console.log(this.form.getRawValue());
    this.user = {
      UserName: this.form.controls.username.value,
      Password: this.form.controls.password.value
    }
    this.organizationService.onLogin(this.user).subscribe((value: any) => {
      // if (document.body.style.filter)
      console.log(document.querySelector('.org-comp'));
      const ele: HTMLElement = this.disp?.nativeElement;
      ele.style.filter= "blur(2px)";
      ele.style.pointerEvents = 'none';
      if (value.body.status === 'True') {
        this.organizationService.isAuthenticated = true;
          this.router.navigate(['multisite/listWebsites']).then(value1 => console.log(value1));
      } else {
        console.log(value.body.status);
      }
    });

  }
}
