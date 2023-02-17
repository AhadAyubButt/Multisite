/* tslint:disable:variable-name */
import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../Services/blogs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { WebsiteService } from '../../../Services/website.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { IBlog } from '../../../Interfaces/blog_interface';
import { UPDATE_BLOG } from 'src/assets/error.contants';
import { ImageService } from '../../../Services/image.service';

@Component({
  selector: 'app-updateblog',
  templateUrl: './updateblog.component.html',
  styleUrls: ['./updateblog.component.css']
})
export class UpdateblogComponent implements OnInit {
  static imageFilesVar: any;
  static blogsService: BlogsService;
  static websiteName: string;
  static imageURLArray: Array<string>;

  // dropzone ts code begin
  files: File[] = [];
  websiteService: WebsiteService;
  router: Router;
  blogObject: IBlog;
  isImageLoading: boolean;

  form = new FormGroup({
    blognewurl: new FormControl(''),
    blogoldurl: new FormControl(''),

    blogname: new FormControl(''),

    blogAltText: new FormControl(''),

    blogImageURL: new FormControl(''),
    blogImageURL1: new FormControl(''),
    blogImageURL2: new FormControl(''),
    blogImageURL3: new FormControl(''),
    blogImageURL4: new FormControl(''),

    blogdescription: new FormControl(''),
    blogmetatitle: new FormControl(''),

    blogmetakeywords: new FormControl(''),
    blogmetadescription: new FormControl('')
  });

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];

  html = '';
  access_token: string;

  public editorContent = 'My Document\'s Title';
  options = {
    toolbarSticky: true,
    imageUploadToS3: {
      uploadURL: ''
    }
  };

  constructor(
    private imageService: ImageService,
    blogsService: BlogsService,
    websiteService: WebsiteService,
    _router: Router,
  ) {
    UpdateblogComponent.blogsService = blogsService;
    UpdateblogComponent.imageURLArray = [];

    this.websiteService = websiteService;
    UpdateblogComponent.websiteName = websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log(
      'In blog current website name is ' + UpdateblogComponent.websiteName
    );
    this.editor = new Editor();
    this.html = '';

    this.access_token = '';
    this.isImageLoading = false;

    this.blogObject = {
      id: '',
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
      DelFlag: ''
    };

    const navigation: any = this.router.getCurrentNavigation();
    UpdateblogComponent.blogsService = blogsService;

    if (null != navigation) {
      const state = navigation.extras.state as {
        blog: any;
      };

      this.blogObject = state.blog;
    }
    this.imageService.getImagefromS3().then(value => {
      console.log(value);
      Object.assign(this.options.imageUploadToS3, value.body.Item);
    });
  }

  get staticfiles(): File[] {
    return this.files;
  }

  ngOnInit(): void {
    this.editorContent = this.blogObject.BlogDescription;
    console.log(' In ngOnInit method of UpdateblogComponent');

    this.form.controls.blognewurl.setValue(this.blogObject.BlogNewURL);
    this.form.controls.blogoldurl.setValue(this.blogObject.BlogOldURL);

    this.form.controls.blogname.setValue(this.blogObject.BlogName);
    this.form.controls.blogdescription.setValue(
      this.blogObject.BlogDescription
    );

    this.form.controls.blogmetadescription.setValue(
      this.blogObject.BlogMetaDataDescription
    );
    this.form.controls.blogmetatitle.setValue(
      this.blogObject.BlogMetaDataTitle
    );
    this.form.controls.blogmetakeywords.setValue(
      this.blogObject.BlogMetaDataKeywords
    );

    if (this.blogObject.BlogImageURL1 !== '') {
      UpdateblogComponent.imageURLArray.push(this.blogObject.BlogImageURL1);
    }
    if (this.blogObject.BlogImageURL2 !== '') {
      UpdateblogComponent.imageURLArray.push(this.blogObject.BlogImageURL2);
    }
    if (this.blogObject.BlogImageURL3 !== '') {
      UpdateblogComponent.imageURLArray.push(this.blogObject.BlogImageURL3);
    }
    if (this.blogObject.BlogImageURL4 !== '') {
      UpdateblogComponent.imageURLArray.push(this.blogObject.BlogImageURL4);
    }
    if (this.blogObject.BlogImageURL !== '' && typeof this.blogObject.BlogImageURL === 'string') {
      UpdateblogComponent.imageURLArray.push(this.blogObject.BlogImageURL);

    }

    for (let i = 0; i < UpdateblogComponent.imageURLArray.length; i++) {
      if (
        UpdateblogComponent.imageURLArray[i] !== undefined ||
        UpdateblogComponent.imageURLArray[i] !== ''
      ) {
        this.getImageFromService(UpdateblogComponent.imageURLArray[i]);
      }
    }
    UpdateblogComponent.imageFilesVar = [];
  }

  getImageFromService(imageURL: string) {
    this.isImageLoading = true;
    this.imageService.getImage(imageURL).subscribe(
      (blob) => {
        this.files.push(new File([blob], 'new.jpeg', { type: 'image/jpeg' }));

        this.isImageLoading = false;
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  updateBlog() {
    console.log('On Login method called');

    UpdateblogComponent.websiteName = this.websiteService.getCurrentWebsiteName();

    const blog: IBlog = {
      id: '',
      BlogAltText: '',
      BlogDescription: this.form.controls.blogdescription.value,
      BlogImageURL: UpdateblogComponent.imageURLArray[0],
      BlogImageURL1: UpdateblogComponent.imageURLArray[1],
      BlogImageURL2: UpdateblogComponent.imageURLArray[2],
      BlogImageURL3: UpdateblogComponent.imageURLArray[3],
      BlogImageURL4: UpdateblogComponent.imageURLArray[4],
      BlogMetaDataDescription: this.form.controls.blogmetadescription.value,
      BlogMetaDataKeywords: this.form.controls.blogmetakeywords.value,
      BlogMetaDataTitle: this.form.controls.blogmetatitle.value,
      BlogName: this.form.controls.blogname.value,
      BlogSchema: this.form.controls.blogschema.value,
      BlogNewURL: this.form.controls.blognewurl.value,
      BlogOldURL: this.form.controls.blogoldurl.value,
      Featured_Blog_Flag: '',
      OrganiztionId: '',
      WebSiteName: UpdateblogComponent.websiteName,
      DelFlag: ''
    };

    const promise = new Promise<any>((resolve, reject) => {

      this.access_token = '';

      UpdateblogComponent.blogsService
        .updateBlog(blog, this.access_token)
        .then((val: any) => {
          if (val.status === UPDATE_BLOG) {
            console.log('POST call successful value returned in body', val);
            this.router.navigate(['updateBlog']);

            // OQ : why is this resolve method used here
            resolve(val);
          } else {
            alert('You are not authorized to perform this operation');
            // OQ : why is this reject method used here
            reject(val);
          }
        });
    });

    return promise;
  }

  // onSelect(any: { addedFiles: any; }) {
  // 	console.log(any);
  //
  // for (let i = 0; i < any.addedFiles.length; i++) {
  //     const formData = new FormData();
  //     let fileName: string;
  //     fileName = any.addedFiles[i].name;
  //     formData.append('file[]', any.addedFiles[i]);
  //     const reader = new FileReader();
  //     // this triggers after readAsDataURL() is called
  //     reader.addEventListener('load', function() {
  //       // create a new image
  //       const img = document.createElement('img') as HTMLImageElement;
  //       // need to wait for it to be loaded to get the natural dimension
  //       img.onload = () => {
  //
  //         const imageURL = UpdateblogComponent.blogsService.createImage(UpdateblogComponent.websiteName, fileName, img.currentSrc);
  //         UpdateblogComponent.imageURLArray.push(imageURL);
  //
  //       };
  //
  //       // set the data url as src
  //       img.src = reader.result as string;
  //     }, false);
  //     // read the file as a data url (compatible with img.src)
  //     reader.readAsDataURL(any.addedFiles[i]);
  //   }
  //
  // if ( UpdateblogComponent.files.length >= 5 ) {
  //     alert('You can only add 5 images');
  //     return;
  //   } else {
  //     UpdateblogComponent.files.push(...any.addedFiles);
  //   }
  //
  // }

  onSelect(any: { addedFiles: any }) {
    // console.log(any);
    //
    if (UpdateblogComponent.imageFilesVar.length < 5) {
      // let  imageFiles: {name: string, file: string}[]= [];
      for (const item of any.addedFiles) {
        const formData = new FormData();
        let fileName: string;
        fileName = item.name;
        formData.append('file[]', item);
        const reader = new FileReader();
        // this triggers after readAsDataURL() is called
        reader.addEventListener(
          'load',
          function() {
            // create a new image
            const img = document.createElement('img') as HTMLImageElement;
            // need to wait for it to be loaded to get the natural dimension
            img.onload = () => {
              UpdateblogComponent.imageFilesVar.push({
                name: fileName,
                file: img.currentSrc
              });

              // let imageURL = UpdateblogComponent.blogsService.createImage(UpdateblogComponent.websiteName, fileName, img.currentSrc)
              // UpdateblogComponent.imageURLArray.push(imageURL);

              console.log(UpdateblogComponent.imageFilesVar);
            };

            // set the data url as src
            img.src = reader.result as string;
            console.log(UpdateblogComponent.imageFilesVar);
          },
          false
        );
        // UpdateblogComponent.imageFilesVar=imageFiles;
        // read the file as a data url (compatible with img.src)
        reader.readAsDataURL(item);
      }
      this.files.push(...any.addedFiles);
    }
  }

  onRemove(any: File) {
    console.log(any);

    const imageIndex = this.files.indexOf(any);
    UpdateblogComponent.imageURLArray.splice(imageIndex, 1);
    this.files.splice(imageIndex, 1);

    // Find the empty elements in the image URL array and remove them
    for (let i = 0; i < UpdateblogComponent.imageURLArray.length; i++) {
      if (UpdateblogComponent.imageURLArray[i] === '') {
        UpdateblogComponent.imageURLArray.splice(i, 1);
      }
    }
  }

  // ts code end

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
