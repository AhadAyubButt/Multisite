import { Component, OnInit } from '@angular/core';
import {IReview} from "../../../Interfaces/review_interface";
import {AllReviewService} from "../../../Services/all-review.service";
import {WebsiteService} from "../../../Services/website.service";
import {IAllReview} from "../../../Interfaces/all-review-page.interface";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-all-review-page-list',
  templateUrl: './all-review-page-list.component.html',
  styleUrls: ['./all-review-page-list.component.css']
})
export class AllReviewPageListComponent implements OnInit {
  reviewList: IAllReview[]=[];

  constructor(private allreviewService: AllReviewService,
              private websiteService: WebsiteService,
              private router: Router) { }

  ngOnInit(): void {
    this.allreviewService.listAllReview(this.websiteService.getCurrentWebsiteName()).subscribe((value:any) => {
      console.log(value);
      this.reviewList = value.Items;

    });
  }

  readReview(id: string) {
    this.allreviewService.reaAllReview(id).subscribe((value: any) => {
      console.log(value.Item.Item);
      const extras: NavigationExtras = {
        state: value.Item.Item
      }
      this.router.navigate(['multisite', 'readAllReview'], extras)
    })
  }

  deleteReview(id:string) {

  }
}
