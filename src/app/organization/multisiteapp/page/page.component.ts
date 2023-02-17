/* tslint:disable:variable-name */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebpagesService } from '../../../Services/webpages.service';
import { WebsiteService } from '../../../Services/website.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { IWebPage } from '../../../Interfaces/webpage_interface';
import { CREATE_WEBPAGE } from 'src/assets/error.contants';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  webPagesService: WebpagesService;
  websiteService: WebsiteService;
  router: Router;
  websiteName: string;
  access_token: string;


  constructor(
    webPagesService: WebpagesService,
    websiteService: WebsiteService,
    _router: Router,

  ) {
    this.webPagesService = webPagesService;
    this.websiteService = websiteService;
    this.websiteName = this.websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log('In web pages current website name is ' + this.websiteName);
    this.editor = new Editor();
    this.html = '';
    this.access_token = '';

  }

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

  ngOnInit(): void {}

  createPage(): Promise<any> {
    console.log('On Login method called');
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    const webpage: IWebPage = {
      id: '',
      websiteName: '',
      pageOldUrl: '',
      pageNewUrl: '',
      pagename: '',
      pagedescription: '',
      pagemetatitle: '',
      pagemetakeywords: '',
      pagemetadescription: '',
      pagetype: '',
      user_id: '',
    };

    webpage.websiteName = this.websiteName;

    webpage.pageOldUrl = this.form.controls.pageOldUrl.value;
    webpage.pageNewUrl = this.form.controls.pageNewUrl.value;

    webpage.pagename = this.form.controls.pagename.value;
    webpage.pagedescription = this.form.controls.pagedescription.value;
    webpage.pagemetatitle = this.form.controls.pagemetatitle.value;
    webpage.pagemetakeywords = this.form.controls.pagemetakeywords.value;
    webpage.pagemetadescription = this.form.controls.pagemetadescription.value;

    return new Promise<any>((resolve, reject) => {
      this.access_token = '';
      webpage.user_id = '';

      this.webPagesService
        .createWebPage(webpage, this.access_token)
        .then((val: any) => {
          if (val.status === CREATE_WEBPAGE) {
            console.log('POST call successful value returned in body', val);
            this.router.navigate(['multisite', 'listPages']).then() ;

            // OQ : why is this resolve method used here
            resolve(val);
          } else {
            alert('You are not authorized to perform this operation');

            // OQ : why is this reject method used here
            reject(val);
          }
        });
    });
  }
}
