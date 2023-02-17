import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {IAllReview} from "../Interfaces/all-review-page.interface";

@Injectable({
  providedIn: 'root'
})
export class AllReviewService {

  constructor(private httpService: HttpService) {
  }

  creatAllReviews(allreview: IAllReview) {
    return this.httpService.createAllReview(allreview)
  }

  listAllReview(websiteName: string): Observable<object> {
    return this.httpService.listAllReview(websiteName)
  }

  reaAllReview(id: string): Observable<Object> {
    return this.httpService.reaAllReview(id);
  }
  updateAllReview(allreview: IAllReview): Observable<Object> {
    return this.httpService.updateAllReview(allreview);
  }
}
