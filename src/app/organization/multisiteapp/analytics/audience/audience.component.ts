import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../../../../Services/website.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {
  websiteName!: string;
  websiteService!: WebsiteService;
  src = '';
  url: SafeResourceUrl = '';
  array = [''];

  constructor(private sanitizer: DomSanitizer, websiteService: WebsiteService) {
    this.websiteService = websiteService;
    this.websiteName = websiteService.getCurrentWebsiteName();
    this.websiteName = this.websiteService.getCurrentWebsiteName();
  }

  ngOnInit(): void {
    if (this.websiteName === 'CBDBoxMakers') {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.array[0]);
    }
    if (this.websiteName === 'US CBD Boxes') {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.array[1]);
    }
    if (this.websiteName === 'FridayPackaging') {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.array[2]);
    }
    if (this.websiteName === 'Stampa Prints') {
      alert('Analytics for this website is not added.')
    }
  }

}
