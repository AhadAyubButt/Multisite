import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IAllReview} from "../../../Interfaces/all-review-page.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {AllReviewService} from "../../../Services/all-review.service";

@Component({
  selector: 'app-all-review-page-read',
  templateUrl: './all-review-page-read.component.html',
  styleUrls: ['./all-review-page-read.component.css']
})
export class AllReviewPageReadComponent implements OnInit {
  private allReviewObj!: IAllReview;
  form: FormGroup = new FormGroup({
    AllReviewsMetaDescription: new FormControl(),
    AllReviewsMetaKeywords: new FormControl(),
    AllReviewsMetaTitle: new FormControl(),
    AllReviewsNewUrl: new FormControl(),
    AllReviewsPageName: new FormControl(),
  });

  constructor(private router: Router,
              private allReviewService: AllReviewService) {
    this.allReviewObj = this.router.getCurrentNavigation()?.extras.state as IAllReview;
  }

  ngOnInit(): void {
    this.form.patchValue({
      AllReviewsMetaDescription: this.allReviewObj.AllReviewsMetaDescription,
      AllReviewsMetaKeywords: this.allReviewObj.AllReviewsMetaKeywords,
      AllReviewsMetaTitle: this.allReviewObj.AllReviewsMetaTitle,
      AllReviewsNewUrl: this.allReviewObj.AllReviewsNewUrl,
      AllReviewsPageName: this.allReviewObj.AllReviewsPageName,
    })
  }

  onSubmit() {
    Object.assign(this.allReviewObj, this.form.getRawValue());
    console.log(this.allReviewObj);
    this.allReviewService.updateAllReview(this.allReviewObj).subscribe((value: any) => {
      if (value.status == 'update:allreviews') {
        this.router.navigate(['multisite', 'listAllReviewsPage'])
      }
    });

  }
}
