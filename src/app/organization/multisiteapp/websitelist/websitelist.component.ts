import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {WebsiteService} from '../../../Services/website.service';
import {IWebSite} from '../../../Interfaces/website_interface';

@Component({
  selector: 'app-websitelist',
  templateUrl: './websitelist.component.html',
  styleUrls: ['./websitelist.component.css']
})

export class WebsitelistComponent implements OnInit {

  router: Router;
  websiteService: WebsiteService;
  websiteList: Array<IWebSite>;
  access_token = '';
  @Output() fireName = new EventEmitter<string>();

  constructor(_router: Router, websiteService: WebsiteService) {

    this.websiteService = websiteService;
    this.router = _router;
    this.websiteList = [];


  }


  ngOnInit(): void {
    $('#click-menu')
      .removeClass('selected')
      .addClass('notselected');
    this.websiteService.deselectWebsite();

    this.listWebsites();

    console.log('list website was called');

  }

  listWebsites(): void {
    this.websiteList = this.websiteService.websiteList;
  }

  createWebsite() {
    this.router.navigate(['multisite', 'createwebsite'])
  }

  openWebsite(websiteName: IWebSite) {

    console.log('openWebsite method called');
    console.log('Name of website is ' + websiteName);

    this.websiteService.selectWebsite();
    this.websiteService.setCurrentWebsiteName(websiteName);

    this.fireName.emit(websiteName.websiteName);

    this.router.navigate(['multisite']);

  }

}
