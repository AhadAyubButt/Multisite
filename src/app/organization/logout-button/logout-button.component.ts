import { Component, Inject, OnInit } from '@angular/core';
//
import { DOCUMENT } from '@angular/common';
import { WebsiteService } from '../../Services/website.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styles: [],
})
export class LogoutButtonComponent implements OnInit {
  constructor(
    private websiteService: WebsiteService,
    // public ,
    @Inject(DOCUMENT) private doc: Document
  ) {

    this.websiteService = websiteService;

  }


  ngOnInit(): void {

  }

  logout(): void {
    // this.auth.logout({ returnTo: this.doc.location.origin });

    // this.websiteService.setCurrentWebsiteName('');

  }
}
