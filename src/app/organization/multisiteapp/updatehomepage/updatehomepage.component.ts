
import { Component,Inject, OnInit } from '@angular/core';
import {HomepageService} from '../../../Services/homepage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Editor, Toolbar } from 'ngx-editor';
import {STORAGE_KEY_CURRENT_WEBSITE_NAME} from '../../../localstoragekeys'
import { WebsiteService } from '../../../Services/website.service';
import { Router } from '@angular/router';
import { IHomePage } from '../../../Interfaces/homepage_interface';
//

@Component({
  selector: 'app-updatehomepage',
  templateUrl: './updatehomepage.component.html',
  styleUrls: ['./updatehomepage.component.css']
})

export class UpdatehomepageComponent implements OnInit {

  constructor(homepagesService: HomepageService, websiteService: WebsiteService, _router: Router,
                  @Inject(LOCAL_STORAGE) private storage: StorageService, ) {

    UpdatehomepageComponent.homepagesService = homepagesService;
    this.websiteService = websiteService;
    this.router = _router;

    this.editor = new Editor();
    this.html='';
    this.websiteName = '';

    this.access_token = '';

    this.homepage = {
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
    }

    const navigation:any = this.router.getCurrentNavigation();
    if(null != navigation) {
      const state = navigation.extras.state as {
				homepage:any
      };

      this.homepage = state.homepage;
    }

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

	homepageName:string = "";
	homepage:IHomePage
  static homepagesService: HomepageService;
  websiteService: WebsiteService;
  router: Router;
  websiteName:string;
  access_token:string;

  ngOnInit(): void {

    console.log("In Page Detail ngOnInit");
    let websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    let user_id:string = '';

    UpdatehomepageComponent.homepagesService.listHomePage(websitename, this.access_token, user_id).then(() => {

      this.form.controls['HomePageNewUrl'].setValue(this.homepage.HomePageNewUrl);
      this.form.controls['HomePageOldUrl'].setValue(this.homepage.HomePageOldUrl);
      this.form.controls['HomePageMetaTitle'].setValue(this.homepage.HomePageMetaTitle);
      this.form.controls['HomePageMetaKeywords'].setValue(this.homepage.HomePageMetaKeywords);
      this.form.controls['HomePageMetaDescription'].setValue(this.homepage.HomePageMetaDescription);

    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  updateHomePage() {
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

  homepage.HomePageNewUrl = this.form.controls['HomePageNewUrl'].value;
  homepage.HomePageOldUrl = this.form.controls['HomePageOldUrl'].value;
  homepage.HomePageMetaTitle = this.form.controls['HomePageMetaTitle'].value;

  homepage.HomePageMetaKeywords = this.form.controls['HomePageMetaKeywords'].value;
  homepage.HomePageMetaDescription = this.form.controls['HomePageMetaDescription'].value;

  var promise = new Promise<any>((resolve, reject) => {


      this.access_token = '';

      homepage.user_id = '';
      UpdatehomepageComponent.homepagesService.updateHomePage(homepage).then((val) => {
        this.router.navigate(['multisite', 'listHomePages']);
        resolve(val);
        });
      });


    return promise;
  }
}
