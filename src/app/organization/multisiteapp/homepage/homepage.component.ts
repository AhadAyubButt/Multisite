
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomepageService } from '../../../Services/homepage.service';
import { WebsiteService } from '../../../Services/website.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { IHomePage } from '../../../Interfaces/homepage_interface';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  HomePageService:HomepageService;
  websiteService:WebsiteService;
  router:Router;
  websiteName:string;

  access_token:string;


  constructor(HomePageService: HomepageService, websiteService: WebsiteService, _router: Router) {

    this.HomePageService = HomePageService;
    this.websiteService = websiteService;
    this.websiteName = this.websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log("In homepage current website name is " + this.websiteName);
    this.editor = new Editor();
    this.html=''

    this.access_token = '';


  }

  form = new FormGroup({
		HomePageNewUrl: new FormControl(''),
		HomePageOldUrl: new FormControl(''),
		HomePageMetaTitle: new FormControl(''),
		HomePageMetaKeywords: new FormControl(''),
		HomePageMetaDescription: new FormControl(''),
  });

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html=''

  ngOnInit(): void {
  }

  createHomePage() {

    console.log("On Login method called");
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    let homepage:IHomePage = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
      HomePageName:"",
			HomePageNewUrl:"",
			HomePageOldUrl:"",
			HomePageMetaTitle:"",
			HomePageMetaKeywords:"",
			HomePageMetaDescription:"",
			access_token:"",
      user_id:""
    };

		homepage.WebsiteName = this.websiteName;
    homepage.HomePageName = "homepage";
    homepage.HomePageNewUrl= this.form.controls['HomePageNewUrl'].value;
    homepage.HomePageOldUrl= this.form.controls['HomePageOldUrl'].value;
    homepage.HomePageMetaTitle= this.form.controls['HomePageMetaTitle'].value;
    homepage.HomePageMetaKeywords= this.form.controls['HomePageMetaKeywords'].value;
    homepage.HomePageMetaDescription= this.form.controls['HomePageMetaDescription'].value;

    var promise = new Promise<any>((resolve, reject) => {


        this.access_token = '';
        homepage.access_token = this.access_token;

        let user_id:string = '';
        homepage.user_id = user_id;

        this.HomePageService.createHomePage(homepage).then((val) => {
          console.log("POST call successful value returned in body",
                      val);
          this.router.navigate(['multisite','listHomePage'])
          resolve(val);
        });

    });
    return promise;

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
