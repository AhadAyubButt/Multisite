import {Component, OnInit} from '@angular/core';
import {IAllReview} from "../../../Interfaces/all-review-page.interface";
import {AllReviewService} from "../../../Services/all-review.service";
import {FormControl, FormGroup} from "@angular/forms";
import {WebsiteService} from "../../../Services/website.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-review-page',
  templateUrl: './all-review-page.component.html',
  styleUrls: ['./all-review-page.component.css']
})
export class AllReviewPageComponent implements OnInit {
  private allReviewObj!: IAllReview;
  form: FormGroup = new FormGroup({
    AllReviewsMetaDescription: new FormControl(),
    AllReviewsMetaKeywords: new FormControl(),
    AllReviewsMetaTitle: new FormControl(),
    AllReviewsNewUrl: new FormControl(),
    AllReviewsPageName: new FormControl(),
  });

  constructor(private allReviewService: AllReviewService,
              private websiteService: WebsiteService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.allReviewObj = {
      AllReviewsMetaDescription: "",
      AllReviewsMetaKeywords: "",
      AllReviewsMetaTitle: "",
      AllReviewsNewUrl: "",
      AllReviewsOldUrl: "",
      AllReviewsPageName: "",
      OrganiztionId: "",
      WebSiteName: this.websiteService.getCurrentWebsiteName(),
      id: ""
    }
  }

  onSubmit() {
    Object.assign(this.allReviewObj, this.form.getRawValue());
    this.allReviewService.creatAllReviews(this.allReviewObj).subscribe((value: any) => {
      console.log(value)
      if (value.status == 'create:allreviews') {
        this.router.navigate(['multisite', 'listAllReviewsPage'])
      }
    });
  }

}
