import { Component, Inject, OnInit } from '@angular/core';
import { WebpagesService } from '../../../Services/webpages.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Editor, Toolbar } from 'ngx-editor';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { WebsiteService } from '../../../Services/website.service';
import { Router } from '@angular/router';
import { IWebPage } from '../../../Interfaces/webpage_interface';
import { UPDATE_WEBPAGE } from 'src/assets/error.contants';

@Component({
  selector: 'app-updatepage',
  templateUrl: './updatepage.component.html',
  styleUrls: ['./updatepage.component.css'],
})
export class UpdatepageComponent implements OnInit {
  constructor(
    webpagesService: WebpagesService,
    websiteService: WebsiteService,
    _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    UpdatepageComponent.webpagesService = webpagesService;
    this.websiteService = websiteService;
    this.router = _router;

    this.editor = new Editor();
    this.html = '';
    this.websiteName = '';

    this.access_token = '';

    this.page = {
      id: '',
      websiteName: '',

      pageNewUrl: '',
      pageOldUrl: '',

      pagename: '',
      pagedescription: '',
      pagemetatitle: '',
      pagemetakeywords: '',
      pagemetadescription: '',
      pagetype: '',
      user_id: '',
    };

    const navigation: any = this.router.getCurrentNavigation();
    if (null != navigation) {
      const state = navigation.extras.state as {
        page: any;
      };

      this.page = state.page;
    }
  }

  static webpagesService: WebpagesService;

  form = new FormGroup({
    pageNewUrl: new FormControl(''),
    pageOldUrl: new FormControl(''),

    pagename: new FormControl(''),

    pagedescription: new FormControl(''),
    pagemetatitle: new FormControl(''),

    pagemetakeywords: new FormControl(''),
    pagemetadescription: new FormControl(''),
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

  html = '';

  pageName = '';
  page: IWebPage;
  websiteService: WebsiteService;
  router: Router;
  websiteName: string;
  access_token: string;

  ngOnInit(): void {
    console.log('In Page Detail ngOnInit');

    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.access_token = '';

    const user_id = '';

    UpdatepageComponent.webpagesService
      .listPages(websitename, this.access_token, user_id)
      .then(() => {
        this.form.controls.pageNewUrl.setValue(this.page.pageNewUrl);
        this.form.controls.pageOldUrl.setValue(this.page.pageOldUrl);

        this.form.controls.pagename.setValue(this.page.pagename);

        this.form.controls.pagedescription.setValue(this.page.pagedescription);
        this.form.controls.pagemetatitle.setValue(this.page.pagemetatitle);

        this.form.controls.pagemetakeywords.setValue(
          this.page.pagemetakeywords
        );
        this.form.controls.pagemetadescription.setValue(
          this.page.pagemetadescription
        );
      });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  updatePage() {
    console.log('On Login method called');
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    const webpage: IWebPage = {
      id: '',
      websiteName: '',

      pageNewUrl: '',
      pageOldUrl: '',

      pagename: '',
      pagedescription: '',
      pagemetatitle: '',
      pagemetakeywords: '',
      pagemetadescription: '',
      pagetype: '',
      user_id: '',
    };

    webpage.pageNewUrl = this.form.controls.pageNewUrl.value;
    webpage.pageOldUrl = this.form.controls.pageOldUrl.value;

    webpage.pagename = this.form.controls.pagename.value;
    webpage.pagedescription = this.form.controls.pagedescription.value;
    webpage.pagemetatitle = this.form.controls.pagemetatitle.value;
    webpage.pagemetakeywords = this.form.controls.pagemetakeywords.value;
    webpage.pagemetadescription = this.form.controls.pagemetadescription.value;
    webpage.id = this.page.id;
    webpage.websiteName = this.websiteName;

    const promise = new Promise<any>((resolve, reject) => {
      this.access_token = '';

      const user_id = '';

      UpdatepageComponent.webpagesService
        .updatePage(webpage, this.access_token, user_id)
        .then((val: any) => {
          if (val.status == UPDATE_WEBPAGE) {
            console.log('POST call successful value returned in body', val);
            this.router.navigate(['multisite', 'listPages']);

            // OQ : why is this resolve method used here
            resolve(val);
          } else {
            alert('You are not authorized to perform this operation');

            // OQ : why is this reject method used here
            reject(val);
          }
        });
    });

    return promise;
  }
}
