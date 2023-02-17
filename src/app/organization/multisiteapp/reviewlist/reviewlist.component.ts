import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ReviewService } from '../../../Services/review.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { WebsiteService } from '../../../Services/website.service';
import { IReview } from '../../../Interfaces/review_interface';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {
  reviewsList: Array<IReview> = [];
  router: Router;
  websiteService: WebsiteService;
  access_token: string;

  constructor(
    private reviewsService: ReviewService,
    public dialog: MatDialog,
    websiteService: WebsiteService,
    _router: Router,
    private route: ActivatedRoute,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    ) {
      this.router = _router;
      this.websiteService = websiteService;

      this.access_token = '';
     }

  ngOnInit(): void {
    console.log('In reviews list');
    this.listReviews();
  }

  readReview(reviewId: string): void {
    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.access_token = '';

    const user_id = '';

    const navigationExtras: NavigationExtras = {
      state: {
        review: reviewId
      }
    };
    this.router
      .navigate(['/multisite', 'readReview'], navigationExtras)
      .then();
    // });
  }

  listReviews(): void {
    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();
    this.reviewsList = [];
    this.reviewsService.listReviews(websiteName, '', '').then((value)=> {
      console.log('NEW CODE',value)
      for(const item of value){
        if (item.DelFlag === '1'){
            this.reviewsList.push(item);
          }
      }
    });
  }
  openDialog(id: string) {
    PopUp.id= id;
    console.log(PopUp.id)
    this.dialog.open(PopUp)
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'pop-up',
  template: `<h1 mat-dialog-title class="main">Delete Product</h1>
  <div mat-dialog-content class="content">Are you sure you want to delete this product?</div>
  <div mat-dialog-actions>
    <button mat-button class="del"(click)='del()'>Delete</button>
    <button mat-button mat-dialog-close (click)='close()'>Close</button>
  </div>`,
  styles: [
    '.main {margin-top:10px; color: white; text-align: center; font-weight: bold}',
    '.content {color: white; margin-bottom: 16px; margin-top: 0px}',
    '.del{background-color: #f44336; color: white; margin:5px}',
    'button{align-items: center}'
  ],
})
export class PopUp{
  static id: string;
  constructor(public dialogRef: MatDialogRef<PopUp>, private prodServ: ReviewService, private router: Router, private route: ActivatedRoute) { }

  close(){
    this.dialogRef.close()
  }
  del(){
    console.log(PopUp.id)
    this.prodServ.deleteReview(PopUp.id).then((value) => {
      if(value.status=="updated"){
        this.close();
        this.router.navigateByUrl('/multisite', { skipLocationChange: true }).then(() => {
          this.router
            .navigate(['/multisite/listReview'], { relativeTo: this.route,  })
            .then((value1) => {
              console.log('value1 is', value1);
            });
        });
      }
    });

  }
}

