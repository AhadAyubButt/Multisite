/* tslint:disable:variable-name */
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BlogsService} from '../../../Services/blogs.service';
import {FormControl, FormGroup} from '@angular/forms';
import {WebsiteService} from '../../../Services/website.service';
import {Router} from '@angular/router';
import {IBlog} from '../../../Interfaces/blog_interface';
import {CREATE_BLOG} from 'src/assets/error.contants';

import {ImageService} from '../../../Services/image.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit, OnDestroy {
  static websiteName: string;
  blogCreationInProgress!: boolean;
  websiteService: WebsiteService;
  router: Router;
  websiteName: string;
  access_token: string;

  form = new FormGroup({

    blogurl: new FormControl(''),
    blogname: new FormControl(''),

    blogschema: new FormControl(''),

    blogAltText: new FormControl(''),

    blogdescription: new FormControl(''),
    blogmetatitle: new FormControl(''),

    blogmetakeywords: new FormControl(''),
    blogmetadescription: new FormControl(''),
    bannerAltText: new FormControl('')

  });
  files: File[] = [];

  // TODO: new object
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
  s3config: any;
  imageFilesVar: { name: string, file: string } = {name: '', file: ''};
  blogBannerImg: any;
  proceed: Observable<boolean> | boolean = false;
  private urlname: any[] | undefined;

  constructor(private blogsService: BlogsService,
              websiteService: WebsiteService,
              _router: Router,
              private imageService: ImageService) {
    this.websiteService = websiteService;
    this.websiteName = websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log('In blog current website name is ' + this.websiteName);

    this.access_token = '';

    // TODO: new code
    console.log(this.s3config);
    // TODO: added options for froala
    this.imageService.getImagefromS3().then(value => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);
    });
    BlogComponent.websiteName = this.websiteService.getCurrentWebsiteName();

  }

  ngOnInit(): void {
    this.blogCreationInProgress = false;
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  createBlog(): void {
    this.proceed = this.proceed = confirm("Are you sure you want to proceed?");
    if (this.proceed) {
      const blog: IBlog = {
        BlogAltText: this.form.controls.bannerAltText.value,
        OrganiztionId: '',
        WebSiteName: '',
        id: '',
        BlogName: '',
        BlogNewURL: '',
        BlogOldURL: '',
        BlogSchema: '',
        BlogDescription: '',
        BlogMetaDataTitle: '',
        BlogMetaDataKeywords: '',
        BlogMetaDataDescription: '',
        Featured_Blog_Flag: '',
        BlogImageURL: this.blogsService.createImage(BlogComponent.websiteName, this.imageFilesVar.name, this.imageFilesVar.file),
        BlogImageURL3: '',
        BlogImageURL4: '',
        BlogImageURL2: '',
        BlogImageURL1: '',
        DelFlag: ''
      };

      blog.WebSiteName = this.websiteName;
      blog.BlogNewURL = this.form.controls.blogurl.value;
      blog.BlogName = this.form.controls.blogname.value;
      blog.BlogSchema = this.form.controls.blogschema.value;
      blog.BlogDescription = this.form.controls.blogdescription.value;

      blog.BlogMetaDataTitle = this.form.controls.blogmetatitle.value;
      blog.Featured_Blog_Flag = '1';
      blog.BlogMetaDataKeywords = this.form.controls.blogmetakeywords.value;
      blog.BlogMetaDataDescription = this.form.controls.blogmetadescription.value;
      // blog.blogImageURL = this.;
      // TODO: Find some proper way access the class member variable blogCreationInProgress
      // TODO : Avoid using static memebers. It increases memory consumption.
      // blog.id = '';
      this.blogsService.createBlog(blog, '').then((value: any) => {
        if (value.status === CREATE_BLOG) {
          console.log('POST call successful value returned in body', value);
          this.router.navigate(['multisite', 'listBlogs']).then();
          // OQ : why is this resolve method used
        } else {
          alert('You are not authorized to perform this operation');

          // OQ : why is this reject method used here
        }
        this.blogCreationInProgress = false;
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

  onRemove(any: File): void {
    console.log(any);
    this.files.splice(this.files.indexOf(any), 1);
    // this.files = undefined;
  }

  ngOnDestroy(): void {
    // this.editor.destroy();
  }

  getImageFromS3(): object {
    return this.imageService.getImagefromS3();
  }
}
