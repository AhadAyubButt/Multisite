import { Component, Inject, OnInit } from '@angular/core';
import { AllblogsService } from '../../../Services/allblogs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Editor, Toolbar } from 'ngx-editor';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { WebsiteService } from '../../../Services/website.service';
import { Router } from '@angular/router';
import { IAllBlogs } from '../../../Interfaces/allblogs_interface';

@Component({
  selector: 'app-updateallblogs',
  templateUrl: './updateallblogs.component.html',
  styleUrls: ['./updateallblogs.component.css']
})

export class UpdateallblogsComponent implements OnInit {

  constructor(allblogssService: AllblogsService, websiteService: WebsiteService, _router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {

    UpdateallblogsComponent.allblogssService = allblogssService;
    this.websiteService = websiteService;
    this.router = _router;

    this.editor = new Editor();
    this.html = '';
    this.websiteName = '';
    this.access_token = '';


    this.allblogs = {
      id: '',
      OrganiztionId: '',
      WebsiteName: '',
      AllBlogsNewUrl: '',
      AllBlogsOldUrl: '',
      AllBlogsPageName: '',
      AllBlogsMetaTitle: '',
      AllBlogsMetaKeywords: '',
      AllBlogsMetaDescription: '',
    };

    const navigation: any = this.router.getCurrentNavigation();
    if (null != navigation) {
      const state = navigation.extras.state as {
        allblogs: any
      };

      this.allblogs = state.allblogs;
    }

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
    access_token: new FormControl('')
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
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  html = '';

  allblogsName: string = '';
  allblogs: IAllBlogs;
  static allblogssService: AllblogsService;
  websiteService: WebsiteService;
  router: Router;
  websiteName: string;
  access_token: string;
  ngOnInit(): void {

    console.log('In Page Detail ngOnInit');
    let websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);


    this.access_token = '';

    let user_id: string = '';

    UpdateallblogsComponent.allblogssService.listAllBlogs(websitename, this.access_token, user_id).then(() => {

      this.form.controls['AllBlogsNewUrl'].setValue(this.allblogs.AllBlogsNewUrl);
      this.form.controls['AllBlogsOldUrl'].setValue(this.allblogs.AllBlogsOldUrl);
      this.form.controls['AllBlogsPageName'].setValue(this.allblogs.AllBlogsPageName);
      this.form.controls['AllBlogsMetaTitle'].setValue(this.allblogs.AllBlogsMetaTitle);
      this.form.controls['AllBlogsMetaKeywords'].setValue(this.allblogs.AllBlogsMetaKeywords);
      this.form.controls['AllBlogsMetaDescription'].setValue(this.allblogs.AllBlogsMetaDescription);

    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  updateAllBlogs() {

    console.log('On Login method called');
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    let allblogs: IAllBlogs = {
      id: '',
      OrganiztionId: '',
      WebsiteName: '',
      AllBlogsNewUrl: '',
      AllBlogsOldUrl: '',
      AllBlogsPageName: '',
      AllBlogsMetaTitle: '',
      AllBlogsMetaKeywords: '',
      AllBlogsMetaDescription: '',
    };

    allblogs.WebsiteName = this.websiteName;
    allblogs.id = this.allblogs.id;

    allblogs.AllBlogsNewUrl = this.form.controls['AllBlogsNewUrl'].value;
    allblogs.AllBlogsOldUrl = this.form.controls['AllBlogsOldUrl'].value;
    allblogs.AllBlogsPageName = this.form.controls['AllBlogsPageName'].value;
    allblogs.AllBlogsMetaTitle = this.form.controls['AllBlogsMetaTitle'].value;
    allblogs.AllBlogsMetaKeywords = this.form.controls['AllBlogsMetaKeywords'].value;
    allblogs.AllBlogsMetaDescription = this.form.controls['AllBlogsMetaDescription'].value;

    var promise = new Promise<any>((resolve, reject) => {


      this.access_token = '';

      let user_id: string = '';


      UpdateallblogsComponent.allblogssService.updateAllBlogs(allblogs).then((val) => {

        console.log('POST call successful value returned in body',
          val);

        this.router.navigate(['multisite', 'listAllBlogsPage']);
        resolve(val);
      });

    });
    return promise;
  }
}
