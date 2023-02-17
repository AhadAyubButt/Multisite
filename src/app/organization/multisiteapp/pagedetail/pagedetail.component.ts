/* tslint:disable:variable-name */
import { Component, Inject, OnInit } from '@angular/core';
import { WebpagesService } from '../../../Services/webpages.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { Router } from '@angular/router';
import { IWebPage } from '../../../Interfaces/webpage_interface';


@Component({
  selector: 'app-pagedetail',
  templateUrl: './pagedetail.component.html',
  styleUrls: ['./pagedetail.component.css']
})


export class PagedetailComponent implements OnInit {

  constructor(webpagesService: WebpagesService, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router,
              ) {

    this.webpagesService = webpagesService;


    const navigation: any = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      page: IWebPage
    };

    this.page = state.page;


    this.access_token = '';

  }

  form = new FormGroup({

    pageurl: new FormControl(''),
    pagename: new FormControl(''),

    pagedescription: new FormControl(''),
    pagemetatitle: new FormControl(''),

    pagemetakeywords: new FormControl(''),
    pagemetadescription: new FormControl('')

  });

  pageName = '';
  page: any = null;
  webpagesService: WebpagesService;

  access_token: string;


  ngOnInit(): void {

    console.log('In Page Detail ngOnInit');

    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);


    this.access_token = '';

    const user_id = '';

    this.webpagesService.listPages(websitename, this.access_token, user_id).then(() => {

      this.form.controls.pageurl.setValue(this.page.URL);
      this.form.controls.pagename.setValue(this.page.Title);

      this.form.controls.pagedescription.setValue(this.page.Description);
      this.form.controls.pagemetatitle.setValue(this.page.MetaDataTitle);

      this.form.controls.pagemetakeywords.setValue(this.page.MetaDataKeywords);
      this.form.controls.pagemetadescription.setValue(this.page.MetaDataDescription);
    });

  }
}
