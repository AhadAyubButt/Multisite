
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AllblogsService} from '../../../Services/allblogs.service';
import { WebsiteService } from '../../../Services/website.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { IAllBlogs } from '../../../Interfaces/allblogs_interface';


@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})

export class AllblogsComponent implements OnInit {

	AllBlogsService:AllblogsService;
  websiteService:WebsiteService;
  router:Router;
  websiteName:string;
  access_token:string;



  constructor(AllBlogsService: AllblogsService, websiteService: WebsiteService, _router: Router) {

    this.AllBlogsService = AllBlogsService;
    this.websiteService = websiteService;
    this.websiteName = this.websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log("In allblogs current website name is " + this.websiteName);
    this.editor = new Editor();
    this.html='';

    this.access_token = '';

  }

  form = new FormGroup({

		id: new FormControl(''),
		OrganizationId: new FormControl(''),
		WebsiteName: new FormControl(''),
		AllBlogsNewUrl: new FormControl(''),
		AllBlogsOldUrl: new FormControl(''),
		AllBlogsPageName: new FormControl(''),
		AllBlogsMetaTitle: new FormControl(''),
		AllBlogsMetaKeywords: new FormControl(''),
		AllBlogsMetaDescription: new FormControl(''),

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

  createAllBlogs() {

    console.log("On Login method called");
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    let allblogs:IAllBlogs = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
			AllBlogsNewUrl:"",
			AllBlogsOldUrl:"",
			AllBlogsPageName:"",
			AllBlogsMetaTitle:"",
			AllBlogsMetaKeywords:"",
			AllBlogsMetaDescription:"",
    };

		allblogs.WebsiteName = this.websiteName;
    allblogs.AllBlogsNewUrl= this.form.controls['AllBlogsNewUrl'].value;
    allblogs.AllBlogsOldUrl= this.form.controls['AllBlogsOldUrl'].value;
    allblogs.AllBlogsPageName= this.form.controls['AllBlogsPageName'].value;
    allblogs.AllBlogsMetaTitle= this.form.controls['AllBlogsMetaTitle'].value;
    allblogs.AllBlogsMetaKeywords= this.form.controls['AllBlogsMetaKeywords'].value;
    allblogs.AllBlogsMetaDescription= this.form.controls['AllBlogsMetaDescription'].value;

    var promise = new Promise<any>((resolve, reject) => {


        this.access_token = '';

          let user_id:string = '';

          this.AllBlogsService.createAllBlogs(allblogs).then((val) => {
            console.log("POST call successful value returned in body",
                        val);
            this.router.navigate(['multisite','listAllBlogsPage'])
            resolve(val);
        })

    });
    return promise;

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
