import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart} from '@angular/router';

import {WebsiteService} from '../../Services/website.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-multisite',
  templateUrl: 'multisiteapp.component.html',
  styleUrls: ['multisiteapp.component.css']
})

export class MultisiteAppComponent implements OnInit {


  websiteSelected: boolean = false;

  get currentWebsiteName(): string {
    return this.websiteService.getCurrentWebsiteName();
  }

  constructor(private router: ActivatedRoute,
              private websiteService: WebsiteService,
              private _router: Router) {

  }

  ngOnInit(): void {
    console.log('In the ngOnInit method of multisiteapp ');
    this.websiteService.getCurrentWebsiteLogoob().subscribe(value => {
      if (value != '') {
        this.websiteSelected = true;
        $('#click-menu')
          .removeClass('notselected')
          .addClass('selected');
      } else {
        $('#click-menu')
          .removeClass('selected')
          .addClass('notselected');
      }

    })
  }


}
