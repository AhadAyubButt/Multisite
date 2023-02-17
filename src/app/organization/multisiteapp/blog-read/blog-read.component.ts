import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {IBlog} from '../../../Interfaces/blog_interface';
import {BlogsService} from '../../../Services/blogs.service';
import {ImageService} from '../../../Services/image.service';
import {UPDATE_BLOG} from 'src/assets/error.contants';
import {WebsiteService} from '../../../Services/website.service';
import {Observable} from "rxjs";

//


@Component({
  selector: 'app-blog-read',
  templateUrl: './blog-read.component.html',
  styleUrls: ['./blog-read.component.css']
})
export class BlogReadComponent implements OnInit {
  blog: IBlog;
  accessToken = '';
  userId = '';
  files: File[] = [];
  imageFilesVar: { name: string; file: string | null | ArrayBuffer } = {name: '', file: ''};
  navtest: any;
  form = new FormGroup({
    blognewurl: new FormControl(''),
    blogoldurl: new FormControl(''),

    blogname: new FormControl(''),

    blogschema: new FormControl(''),

    blogImageURL: new FormControl(''),
    blogImageURL1: new FormControl(''),
    blogImageURL2: new FormControl(''),
    blogImageURL3: new FormControl(''),
    blogImageURL4: new FormControl(''),
    blogdescription: new FormControl(''),
    blogmetatitle: new FormControl(''),

    blogmetakeywords: new FormControl(''),
    blogmetadescription: new FormControl(''),
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
    private blogService: BlogsService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private websiteService: WebsiteService
  ) {
    this.blog = {
      BlogAltText: '',
      BlogDescription: '',
      BlogImageURL: '',
      BlogImageURL1: '',
      BlogImageURL2: '',
      BlogImageURL3: '',
      BlogImageURL4: '',
      BlogMetaDataDescription: '',
      BlogMetaDataKeywords: '',
      BlogMetaDataTitle: '',
      BlogName: '',
      BlogNewURL: '',
      BlogOldURL: '',
      BlogSchema: '',
      Featured_Blog_Flag: '',
      OrganiztionId: '',
      WebSiteName: '',
      id: '',
      DelFlag: ''
    };
    const location = this.router.getCurrentNavigation();
    if (location !== null) {
      const state = location.extras.state as {
        blog: string;
      };
      this.blog.id = state.blog;
    }
    this.imageService.getImagefromS3().then((value) => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);
    });

    // this.navtest = this.route.snapshot.paramMap.get('id');
    // console.log(this.navtest);
  }

  ngOnInit(): void {
    this.readBlog(this.blog.id, '', '');
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  readBlog(id: string, accessToken: string, userId: string): void {
    this.blogService.readBlog(id, accessToken, userId).then((value) => {
      console.log(value);
      Object.assign(this.blog, value.Item.Item);
      console.log('hello', this.blog.BlogImageURL);
      this.getImageFromService(this.blog.BlogImageURL as string);
      this.form.controls.blognewurl.setValue(this.blog.BlogNewURL);
      this.form.controls.blogoldurl.setValue(this.blog.BlogOldURL);
      this.form.controls.bannerAltText.setValue(this.blog.BlogAltText);
      this.form.controls.blogname.setValue(this.blog.BlogName);
      this.form.controls.blogschema.setValue(this.blog.BlogSchema);
      this.form.controls.blogdescription.setValue(this.blog.BlogDescription);
      this.form.controls.blogmetadescription.setValue(
        this.blog.BlogMetaDataDescription
      );
      this.form.controls.blogmetatitle.setValue(this.blog.BlogMetaDataTitle);
      this.form.controls.blogmetakeywords.setValue(
        this.blog.BlogMetaDataKeywords
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
              // BlogComponent.imageURLArray.push(imageURL);
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

  updateBlog(): void {
    // this.blogService.updateBlog(this.blog, this.accessToken);
    this.proceed = this.proceed = confirm("Are you sure you want to proceed?");
    if (this.proceed) {
      const blog: IBlog = {
        BlogAltText: this.form.controls.bannerAltText.value,
        BlogDescription: this.form.controls.blogdescription.value,
        BlogImageURL: this.blogService.createImage(
          this.websiteService.getCurrentWebsiteName(),
          this.imageFilesVar.name,
          this.imageFilesVar.file as string as string
        ),
        BlogImageURL1: '',
        BlogImageURL2: '',
        BlogImageURL3: '',
        BlogImageURL4: '',
        BlogMetaDataDescription: this.form.controls.blogmetadescription.value,
        BlogMetaDataKeywords: this.form.controls.blogmetakeywords.value,
        BlogMetaDataTitle: this.form.controls.blogmetatitle.value,
        BlogName: this.form.controls.blogname.value,
        BlogSchema: this.form.controls.blogschema.value,
        BlogNewURL: this.form.controls.blognewurl.value,
        BlogOldURL: this.form.controls.blogoldurl.value,
        Featured_Blog_Flag: '',
        OrganiztionId: '',
        WebSiteName: this.websiteService.getCurrentWebsiteName(),
        id: this.blog.id,
        DelFlag: ''
      };

      this.blogService.updateBlog(blog, this.accessToken).then((val: any) => {
        if (val.status === UPDATE_BLOG) {
          console.log('POST call successful value returned in body', val);
          this.router.navigate(['/multisite', 'listBlogs']);

          // OQ : why is this resolve method used here
        } else {
          alert('You are not authorized to perform this operation');

          // OQ : why is this reject method used here
        }
      });
    }
  }

  onRemove(f: File): void {
    console.log(f);
    this.files.splice(this.files.indexOf(f), 1);
    // this.files = undefined;
  }


}
