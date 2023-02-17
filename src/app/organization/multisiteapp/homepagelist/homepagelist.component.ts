import { Component, Inject, OnInit } from '@angular/core';
import { HomepageService } from '../../../Services/homepage.service';
import { NavigationExtras, Router } from '@angular/router';
import { WebsiteService } from '../../../Services/website.service';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IHomePage } from '../../../Interfaces/homepage_interface';


@Component({
  selector: 'app-homepagelist',
  templateUrl: './homepagelist.component.html',
  styleUrls: ['./homepagelist.component.css']
})

export class HomepagelistComponent implements OnInit {

  constructor(HomePageService: HomepageService, websiteService: WebsiteService, _router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService,  ) {

    this.HomePageService = HomePageService;
    this.router = _router;
    this.websiteService = websiteService;

    this.access_token = '';


  }

  HomePageService: HomepageService;
  homepageList: Array<IHomePage> = [];
  router: Router;
  websiteService: WebsiteService;

  access_token: string;


  ngOnInit(): void {
    console.log('HomePage list');
    this.listHomePage();
  }

  updateHomePage(homepageName: string) {

    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);


    this.access_token = '';

    const user_id: string = '';

    this.HomePageService.listHomePage(websitename, this.access_token, user_id).then(() => {

      const homepageInList = this.HomePageService.gethomepageByName(homepageName);
      const navigationExtras: NavigationExtras = {
        state: {
          homepage: homepageInList
        }
      };

      this.router.navigate(['multisite', 'UpdateHomePage'], navigationExtras);
    });


  }

  listHomePage() {
    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();

    this.access_token = '';

    let user_id: string = '';

    this.HomePageService.listHomePage(websiteName, this.access_token, user_id).then((homepageList) => {
      this.homepageList = [];
      this.homepageList = homepageList;

    });
  }

}
