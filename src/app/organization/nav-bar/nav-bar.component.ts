import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsiteService } from '../../Services/website.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {


  websiteSelected: boolean = false;
  currentWebsiteLogo = '';
  subscription: Subscription;


  constructor(private websiteService: WebsiteService, private router: Router) {
    this.subscription = this.websiteService.getCurrentWebsiteLogoob().subscribe(value => {
      console.log('VALUEEE', value);
      if (value) {
        this.websiteSelected = true;
        this.currentWebsiteLogo = value;
        $('#new').removeClass('disappear').addClass('appear');

      } else {
        this.websiteSelected = false;
        $('#new').removeClass('appear').addClass('disappear');
      }
    });
  }


  ngOnInit(): void {
    console.log('nav bar ngOnInit method called');

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
