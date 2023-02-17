/* tslint:disable:variable-name */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebsiteService } from '../../../Services/website.service';
import { Router } from '@angular/router';
import { IWebSite} from '../../../Interfaces/website_interface';
import { CREATE_WEBSITE } from 'src/assets/error.contants';

import { ImageService } from '../../../Services/image.service';

@Component({
  selector: 'app-addwebsite',
  templateUrl: './addwebsite.component.html',
  styleUrls: ['./addwebsite.component.css']
})
export class AddwebsiteComponent implements OnInit {

  static websiteName: string;
  websiteCreationInProgress!: boolean;
  websiteService: WebsiteService;
  router: Router;
  access_token: string;

  form = new FormGroup({

    websitename: new FormControl(''),
  });
  files: File[] = [];
  s3config: any;
  private urlname: any[] | undefined;
  imageFilesVar: { name: string, file: string } = { name: '', file: '' };
  blogBannerImg: any;

  constructor(websiteService: WebsiteService,
              _router: Router,
              private imageService: ImageService) {
    this.websiteService = websiteService;
    // this.websiteName = websiteService.getCurrentWebsiteName();
    this.router = _router;
    // console.log('In website current website name is ' + this.websiteName);

    this.access_token = '';

    // TODO: new code
    console.log(this.s3config);
    // TODO: added options for froala
    this.imageService.getImagefromS3().then(value => {

    });
    // AddwebsiteComponent.websiteName = this.websiteService.getCurrentWebsiteName();

  }

  ngOnInit(): void {
    // this.websiteCreationInProgress = false;
  }

  createWebsite(): Promise<any> | null {

    // console.log('On Login method called');
    // if (this.websiteCreationInProgress) {
    //   return null;
    // } else {
    //   this.websiteCreationInProgress = true;
    // }

    const website: IWebSite = {
      websiteName: '',
      id: '',
      websiteImageURL: this.websiteService.createImage(AddwebsiteComponent.websiteName, this.imageFilesVar.name, this.imageFilesVar.file),
      OrganizationId: '1',
      Logo: ''
    };

    website.websiteName = this.form.controls.websitename.value;
    // blog.blogImageURL = this.;


    return new Promise<any>((resolve, reject) => {



        this.access_token = '';
        // TODO: Find some proper way access the class member variable blogCreationInProgress
        // TODO : Avoid using static memebers. It increases memory consumption.
        // blog.id = '';
        this.websiteService.createWebsite(website, this.access_token).then((value: any) => {
          if (value.status === CREATE_WEBSITE) {
            console.log('POST call successful value returned in body', value);
            this.router.navigate(['multisite', 'listWebsites']).then();
            // OQ : why is this resolve method used
            resolve(value);
          } else {
            alert('You are not authorized to perform this operation');

            // OQ : why is this reject method used here
            reject(value);
          }
          // this.websiteCreationInProgress = false;
        });
      });

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
            this.imageFilesVar = { name: fileName, file: img.currentSrc };
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
