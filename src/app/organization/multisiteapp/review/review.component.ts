/* tslint:disable:variable-name */
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from '../../../Services/review.service';
import {FormControl, FormGroup} from '@angular/forms';
import {WebsiteService} from '../../../Services/website.service';
import {Router} from '@angular/router';
import {IReview} from '../../../Interfaces/review_interface';
// import { CREATE_REVIEW} from 'src/assets/error.contants';
import {ImageService} from '../../../Services/image.service';
import {CREATE_BLOG} from 'src/assets/error.contants';
import {Observable} from "rxjs";


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit, OnDestroy {
  static websiteName: string;
  reviewCreationInProgress!: boolean;
  websiteService: WebsiteService;
  router: Router;
  websiteName: string;
  access_token: string;
  form = new FormGroup({

    reviewurl: new FormControl(''),
    reviewname: new FormControl(''),

    reviewschema: new FormControl(''),

    reviewAltText: new FormControl(''),

    reviewdescription: new FormControl(''),
    reviewmetatitle: new FormControl(''),

    reviewmetakeywords: new FormControl(''),
    reviewmetadescription: new FormControl(''),
    bannerAltText: new FormControl('')

  });
  files: File[] = [];

  // TODO: new object
  options = {
    placeholderText: 'Enter Review Description',
    toolbarSticky: true,
    toolbarStickyOffset: 100,
    imageUploadToS3: {
      uploadURL: ''
    },
    videoUploadToS3: {
      uploadURL: ''
    }
  };
  imageFilesVar: { name: string, file: string } = {name: '', file: ''};
  reviewBannerImg: any;
  proceed: Observable<boolean> | boolean = false;
  private urlname: any[] | undefined;

  constructor(private reviewService: ReviewService,
              websiteService: WebsiteService,
              _router: Router,
              private imageService: ImageService) {
    this.websiteService = websiteService;
    this.websiteName = websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log('In blog current website name is ' + this.websiteName);

    this.access_token = '';
    // TODO: new code
    // TODO: added options for froala
    this.imageService.getImagefromS3().then(value => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);
    });
    ReviewComponent.websiteName = this.websiteService.getCurrentWebsiteName();

  }

  ngOnInit(): void {
    this.reviewCreationInProgress = false;
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  createReview(): void {
    this.proceed = confirm("Are you sure you want to proceed?");
    console.log(this.proceed);
    if (this.proceed) {

      const review: IReview = {
        ReviewAltText: this.form.controls.bannerAltText.value,
        OrganiztionId: '',
        WebSiteName: this.websiteName,
        id: '',
        ReviewName: this.form.controls.reviewname.value,
        ReviewNewURL: this.form.controls.reviewurl.value,
        ReviewOldURL: '',
        ReviewSchema: this.form.controls.reviewschema.value,
        ReviewDescription: this.form.controls.reviewdescription.value,
        ReviewMetaDataTitle: this.form.controls.reviewmetatitle.value,
        ReviewMetaDataKeywords: this.form.controls.reviewmetakeywords.value,
        ReviewMetaDataDescription: this.form.controls.reviewmetadescription.value,
        Featured_Review_Flag: '1',
        ReviewImageURL: this.reviewService.createImage(ReviewComponent.websiteName, this.imageFilesVar.name, this.imageFilesVar.file),
        ReviewImageURL3: '',
        ReviewImageURL4: '',
        ReviewImageURL2: '',
        ReviewImageURL1: '',
        DelFlag: ''
      };
      this.reviewService.createReview(review, '').then((value: any) => {
        if (value.status === "create:review") {
          console.log('POST call successful value returned in body', value);
          this.router.navigate(['multisite', 'listReview']).then();
          // OQ : why is this resolve method used
        } else {
          alert('You are not authorized to perform this operation');
          // OQ : why is this reject method used here
        }
        this.reviewCreationInProgress = false;
      });
    }
  }

  onSelect(imgvar: { addedFiles: any; }): void {

    if (imgvar.addedFiles.length <= 1) {
      for (const item of imgvar.addedFiles) {
        console.log(imgvar.addedFiles);
        const formData = new FormData();
        const fileName: string = item.name;

        formData.append('file[]', item);
        const reader = new FileReader();
        // this triggers after readAsDataURL() is called
        reader.addEventListener('load', () => {
          // create a new image
          const img = document.createElement('img') as HTMLImageElement;
          // need to wait for it to be loaded to get the natural dimension
          img.onload = () => {
            // this.imageFilesVar = {name: fileName, file: img.currentSrc};
            this.imageFilesVar = {name: fileName, file: img.currentSrc};
            // BlogComponent.imageURLArray.push(imageURL);
            console.log(this.imageFilesVar);
          };
          // set the data url as src
          img.src = reader.result as string;
          // img.alt = document.addEventListener('input', )
          // console.log(this.imageFilesVar);
        }, false);

        // read the file as a data url (compatible with img.src)
        reader.readAsDataURL(item);
      }
      // this.form.controls.
      this.files = imgvar.addedFiles;
    }
    // restrict to add only 5 images
    else {
      alert('Cannot add more than 1 image');
    }
  }

  createImage(): void {

    // this method push images into s3 bucket and provide image url to add images with in the description
    this.urlname = [];
    // for (const item of this.imageFilesVar) {
    //   const imageURL = this.blogsService.createImage(BlogComponent.websiteName, item.name, item.file);
    //   // this.imageURLArray = imageURL;
    //   this.urlname.push(imageURL);
    //
    //
    // }
    alert(`Files uploded!`);
  }

  // this.files.push(...any.addedFiles);

  onRemove(any: File): void {
    console.log(any);
    this.files.splice(this.files.indexOf(any), 1);
    // this.files = undefined;
  }

  // dropzone ts code end


  ngOnDestroy(): void {
    // this.editor.destroy();
  }

  getImageFromS3(): object {
    return this.imageService.getImagefromS3();
  }
}
