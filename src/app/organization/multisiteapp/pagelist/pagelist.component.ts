/* tslint:disable:variable-name */
import { Component, Inject, OnInit } from '@angular/core';
import { WebpagesService } from '../../../Services/webpages.service';
import { NavigationExtras, Router } from '@angular/router';
import { WebsiteService } from '../../../Services/website.service';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


@Component({
  selector: 'app-pagelist',
  templateUrl: './pagelist.component.html',
  styleUrls: ['./pagelist.component.css'],
})
export class PagelistComponent implements OnInit {
  constructor(
    webPagesService: WebpagesService,
    websiteService: WebsiteService,
    _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,

  ) {
    this.webPagesService = webPagesService;
    this.router = _router;
    this.websiteService = websiteService;

    this.access_token = '';

  }

  webPagesService: WebpagesService;
  pagesList: Array<any> = [];
  router: Router;
  websiteService: WebsiteService;
  access_token: string;


  ngOnInit(): void {
    console.log('Page list');
    this.listPages();
  }

  openPage(pageName: string): void {
    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.access_token = '';

    const user_id = '';

    this.webPagesService
      .listPages(websitename, this.access_token, user_id)
      .then(() => {
        const pageInList = this.webPagesService.getPageByName(pageName);
        const navigationExtras: NavigationExtras = {
          state: {
            page: pageInList,
          },
        };

        this.router.navigate(['multisite', 'updatepage'], navigationExtras);
      });
  }

  listPages(): void {
    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();

    this.access_token = '';

    const user_id = '';

    this.webPagesService
      .listPages(websiteName, this.access_token, user_id)
      .then((pageList) => {
        this.pagesList = [];
        this.pagesList = pageList;
      });
  }
}
