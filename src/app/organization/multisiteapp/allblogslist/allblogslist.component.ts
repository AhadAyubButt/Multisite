import { Component, Inject, OnInit } from '@angular/core';
import { AllblogsService } from '../../../Services/allblogs.service';
import { NavigationExtras, Router } from '@angular/router';
import { WebsiteService } from '../../../Services/website.service';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {IBlog} from "../../../Interfaces/blog_interface";
import {IAllBlogs} from "../../../Interfaces/allblogs_interface";


@Component({
  selector: 'app-allblogslist',
  templateUrl: './allblogslist.component.html',
  styleUrls: ['./allblogslist.component.css']
})

export class AllblogslistComponent implements OnInit {

  constructor(AllBlogsService: AllblogsService, websiteService: WebsiteService, _router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService, ) {

    this.AllBlogsService = AllBlogsService;
    this.router = _router;
    this.websiteService = websiteService;

    this.access_token = '';


  }

  AllBlogsService: AllblogsService;
  allblogsList: IAllBlogs[] = [];
  router: Router;
  websiteService: WebsiteService;
  access_token: string;


  ngOnInit(): void {
    console.log('AllBlogs list');
    this.listAllBlogs();
  }

  updateAllBlogs(allblogsid: string): void {

    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.access_token = '';

    const user_id = '';

    this.AllBlogsService.listAllBlogs(websitename, this.access_token, user_id).then(() => {

      const allblogsInList = this.AllBlogsService.getallblogsById(allblogsid);
      const navigationExtras: NavigationExtras = {
        state: {
          allblogs: allblogsInList
        }
      };
      this.router.navigate(['multisite', 'updateAllBlogs'], navigationExtras);
    });
  }

  listAllBlogs(): void {

    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();

    this.access_token = '';

    const user_id = '';

    // TODO : method parameter should be empty. All information to be passed through interface objects.
    this.AllBlogsService.listAllBlogs(websiteName, this.access_token, user_id).then((allblogsList) => {
      this.allblogsList = [];
      this.allblogsList = allblogsList;
    });


  }

}
