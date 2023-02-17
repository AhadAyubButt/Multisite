import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {IReview} from '../../../Interfaces/review_interface';
import {ReviewService} from '../../../Services/review.service';
import {ImageService} from '../../../Services/image.service';
import {UPDATE_REVIEW} from 'src/assets/error.contants';
import {WebsiteService} from '../../../Services/website.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-readreview',
  templateUrl: './readreview.component.html',
  styleUrls: ['./readreview.component.css']
})
export class ReadReviewComponent implements OnInit {
  review: IReview;
  accessToken = '';
  userId = '';
  files: File[] = [];
  imageFilesVar: { name: string; file: string | null | ArrayBuffer } = {name: '', file: ''};
  navtest: any;
  form = new FormGroup({
    reviewnewurl: new FormControl(''),
    reviewoldurl: new FormControl(''),

    reviewname: new FormControl(''),

    reviewschema: new FormControl(''),

    reviewImageURL: new FormControl(''),
    reviewImageURL1: new FormControl(''),
    reviewImageURL2: new FormControl(''),
    reviewImageURL3: new FormControl(''),
    reviewImageURL4: new FormControl(''),
    reviewdescription: new FormControl(''),
    reviewmetatitle: new FormControl(''),

    reviewmetakeywords: new FormControl(''),
    reviewmetadescription: new FormControl(''),
    bannerAltText: new FormControl('')
  });
  options = {
    toolbarSticky: true,
    toolbarStickyOffset: 100,
    imageUploadToS3: {
      uploadURL: ''
    },
    videoUploadToS3: {
      uploadURL: ''
    }
  };
  proceed: Observable<boolean> | boolean = false;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private websiteService: WebsiteService
  ) {
    this.review = {
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
    const location = this.router.getCurrentNavigation();
    if (location !== null) {
      const state = location.extras.state as {
        review: string;
      };
      this.review.id = state.review;
    }
    this.imageService.getImagefromS3().then((value) => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);
    });

    // this.navtest = this.route.snapshot.paramMap.get('id');
    // console.log(this.navtest);
  }

  ngOnInit(): void {
    this.readReview(this.review.id, '', '');
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  readReview(id: string, accessToken: string, userId: string): void {
    this.reviewService.readReview(id, accessToken, userId).then((value) => {
      console.log(value);
      Object.assign(this.review, value.Item.Item);
      console.log('hello', this.review.ReviewImageURL);
      this.getImageFromService(this.review.ReviewImageURL as string);
      this.form.controls.reviewnewurl.setValue(this.review.ReviewNewURL);
      this.form.controls.reviewoldurl.setValue(this.review.ReviewOldURL);
      this.form.controls.bannerAltText.setValue(this.review.ReviewAltText);
      this.form.controls.reviewname.setValue(this.review.ReviewName);
      this.form.controls.reviewschema.setValue(this.review.ReviewSchema);
      this.form.controls.reviewdescription.setValue(this.review.ReviewDescription);
      this.form.controls.reviewmetadescription.setValue(
        this.review.ReviewMetaDataDescription
      );
      this.form.controls.reviewmetatitle.setValue(this.review.ReviewMetaDataTitle);
      this.form.controls.reviewmetakeywords.setValue(
        this.review.ReviewMetaDataKeywords
      );
    });
  }

  onSelect(imgvar: { addedFiles: any }): void {
    // console.log(any);
    //
    if (imgvar.addedFiles.length <= 1) {
      for (const item of imgvar.addedFiles) {
        console.log(imgvar.addedFiles);
        const formData = new FormData();
        const fileName: string = item.name;

        formData.append('file[]', item);
        const reader = new FileReader();
        // this triggers after readAsDataURL() is called
        reader.addEventListener(
          'load',
          () => {
            // create a new image
            const img = document.createElement('img') as HTMLImageElement;
            // need to wait for it to be loaded to get the natural dimension
            img.onload = () => {
              // this.imageFilesVar = {name: fileName, file: img.currentSrc};
              // img.alt = 'TEMP-ALT';
              this.imageFilesVar = {name: fileName, file: img.currentSrc};
              // ReviewComponent.imageURLArray.push(imageURL);
              console.log(this.imageFilesVar);
            };
            // set the data url as src
            img.src = reader.result as string;
            console.log(img);
          },
          false
        );

        // read the file as a data url (compatible with img.src)
        reader.readAsDataURL(item);
      }
      this.files = imgvar.addedFiles;
    }
    // restrict to add only 5 images
    else {
      alert('Cannot add more than 1 image');
    }
  }

  getImageFromService(imageURL: string): void {
    const imgname = imageURL.replace(
      '',
      ''
    );
    const type = imgname.split('.')[1];
    this.imageService.getImage(imageURL).subscribe(
      (blob) => {
        this.files.push(new File([blob], imgname, {type: 'image/' + type}));
        const reader = new FileReader();
        reader.onload = () => {
          this.imageFilesVar = {
            name: imgname,
            file: reader.result
          };
        };
        reader.readAsDataURL(blob);
        console.log('heloo', this.imageFilesVar);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateReview(): void{
    this.proceed = confirm("Are you sure you want to proceed?");
    // this.reviewService.updatereview(this.review, this.accessToken);
    console.log('On Login method called');
    const review: IReview = {
      ReviewAltText: this.form.controls.bannerAltText.value,
      ReviewDescription: this.form.controls.reviewdescription.value,
      // ReviewImageURL: this.reviewService.createImage(
      //   this.websiteService.getCurrentWebsiteName(),
      //   this.imageFilesVar.name,
      //   this.imageFilesVar.file as string as string
      // ),
      ReviewImageURL: this.review.ReviewImageURL,
      ReviewImageURL1: '',
      ReviewImageURL2: '',
      ReviewImageURL3: '',
      ReviewImageURL4: '',
      ReviewMetaDataDescription: this.form.controls.reviewmetadescription.value,
      ReviewMetaDataKeywords: this.form.controls.reviewmetakeywords.value,
      ReviewMetaDataTitle: this.form.controls.reviewmetatitle.value,
      ReviewName: this.form.controls.reviewname.value,
      ReviewSchema: this.form.controls.reviewschema.value,
      ReviewNewURL: this.form.controls.reviewnewurl.value,
      ReviewOldURL: this.form.controls.reviewoldurl.value,
      Featured_Review_Flag: '',
      OrganiztionId: '',
      WebSiteName: this.websiteService.getCurrentWebsiteName(),
      id: this.review.id,
      DelFlag: ''
    };
    if (this.proceed)
      this.reviewService.updateReview(review, this.accessToken).then((val: any) => {
        if (val.status === UPDATE_REVIEW) {
          console.log('POST call successful value returned in body', val);
          this.router.navigate(['/multisite', 'listReview']);

          // OQ : why is this resolve method used here
        } else {
          alert('You are not authorized to perform this operation');

        }
      });
  }

  onRemove(f: File): void {
    console.log(f);
    this.files.splice(this.files.indexOf(f), 1);
    // this.files = undefined;
  }
}
