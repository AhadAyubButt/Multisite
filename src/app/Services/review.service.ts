/* tslint:disable:variable-name */
import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { STORAGE_KEY_CURRENT_REVIEW_NAME } from '../localstoragekeys';
import { IReview} from '../Interfaces/review_interface';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  reviewsList: Array<IReview> = [];

  currentReviewName: string;
  s3config: object = {};

  constructor(
    private httpService: HttpService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.currentReviewName = '';
    this.currentReviewName = this.storage.get(STORAGE_KEY_CURRENT_REVIEW_NAME);
  }

  createImage(websitename: string, name: string, file: string): string {
    return this.httpService.createImage(websitename, name, file);
  }

  getReviewByName(reviewName: string): IReview| void {
    return this.reviewsList.forEach((value) => {
      return value.ReviewName === reviewName;
    });
    // for (let i = 0; i < this.blogsList.length; i++) {
    //   if (this.blogsList[i].BlogName === blogName) {
    //     return this.blogsList[i];
    //   }
    // }
    // If there is not matching blog, return first blog
    // return this.blogsList[0];
  }

  updateReview(review: IReview, access_token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService.updateReview(review).then((returnValue) => {
        console.log('Return value of update Review is ' + returnValue);
        resolve(returnValue);
      });
    });

    // return this.httpService.updateBlog(blog, access_token);
  }

  createReview(review: IReview, access_token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService.createReview(review).then((returnValue) => {
        console.log('Return value of create review is ' + returnValue);
        resolve(returnValue);
      });
    });
  }

  listReviews(websitename: string, access_token: string, user_id: string): Promise<any> {
    this.reviewsList = [];

    return new Promise<any>((resolve, reject) => {
      this.httpService
        .listReviews(websitename, access_token, user_id)
        .then((returnValue) => {
          console.log('websites are: ' + returnValue);

          let items: Array<any>;
          items = [];
          const retValue: any = returnValue?.body as any;
          if (retValue.status === NOT_AUTHORIZED) {
            alert('You are not authorized to perform this operation.');
            reject(NOT_AUTHORIZED);
          } else {
            const array: Array<string> = retValue.Items;

            array.forEach(item => {

              const review: IReview = {
                ReviewAltText: '',
                ReviewDescription: '',
                ReviewImageURL: '',
                ReviewImageURL1: '',
                ReviewImageURL2: '',
                ReviewImageURL3: '',
                ReviewImageURL4: '',
                ReviewMetaDataDescription: '',
                ReviewMetaDataKeywords: '',
                ReviewMetaDataTitle: '',
                ReviewName: '',
                ReviewNewURL: '',
                ReviewOldURL: '',
                ReviewSchema: '',
                Featured_Review_Flag: '',
                OrganiztionId: '',
                WebSiteName: '',
                id: '',
                DelFlag: ''
              };

              const reviewObject = item as any;

              review.id = reviewObject.id;
              review.WebSiteName = reviewObject.WebSiteName;

              review.ReviewAltText = reviewObject.ReviewAltText;
              review.ReviewName = reviewObject.ReviewName;
              review.DelFlag = reviewObject.DelFlag;

              review.ReviewSchema = reviewObject.ReviewSchema;
              review.ReviewImageURL = reviewObject.ReviewImageURL;

              review.ReviewNewURL = reviewObject.ReviewNewURL;
              review.ReviewOldURL = reviewObject.ReviewOldURL;

              review.ReviewMetaDataTitle = reviewObject.ReviewMetaDataTitle;
              review.ReviewMetaDataKeywords = reviewObject.ReviewMetaDataKeywords;
              review.ReviewMetaDataDescription = reviewObject.ReviewMetaDataDescription;

              review.ReviewDescription = reviewObject.ReviewDescription;

              this.reviewsList.push(review);
            });
            console.log(this.reviewsList);
            resolve(this.reviewsList);
          }
        });
    });
  }

  setCurrentReviewName(reviewName: string): void {
    this.currentReviewName = reviewName;
    this.storage.set(STORAGE_KEY_CURRENT_REVIEW_NAME, this.currentReviewName);
  }

  getCurrentReviewName(): string {
    this.currentReviewName = this.storage.get(STORAGE_KEY_CURRENT_REVIEW_NAME);
    return this.currentReviewName;
  }

  deleteReview(id: string): Promise<any> {
    return this.httpService.deleteReview(id);
  }

  readReview(id: string, accessToken: string, userId: string): Promise<any> {
    return this.httpService.readReview(id, accessToken, userId);
  }
}
