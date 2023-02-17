/* tslint:disable:variable-name */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductcategoryService } from '../../../Services/productcategory.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { WebsiteService } from '../../../Services/website.service';
import { IProductCategory } from '../../../Interfaces/product_category_interface';
import { UPDATE_PRODUCT_CATEGORY } from 'src/assets/error.contants';


@Component({
  selector: 'app-updateproductcategory',
  templateUrl: './updateproductcategory.component.html',
  styleUrls: ['./updateproductcategory.component.css']
})
export class UpdateproductcategoryComponent implements OnInit, OnDestroy {
  websiteName: string;
  html = '';
  auth: any;
  access_token: string;
  productCategoryName = '';
  productcategory: IProductCategory;

  form = new FormGroup({

    PCNewUrl: new FormControl(''),
    PCOldUrl: new FormControl(''),

    PCName: new FormControl(''),

    PCDescription: new FormControl(''),
    PCMetaDataTitle: new FormControl(''),

    PCMetaDataKeywords: new FormControl(''),
    PCMetaDataDescription: new FormControl('')

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


  // All keys should come from one file
  constructor(private productcategoryService: ProductcategoryService,
              private websiteService: WebsiteService,
              private router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {

    this.websiteName = this.websiteService.getCurrentWebsiteName();
    this.productcategory = {
      id: '',
      PCName: '',
      PCMetaDataDescription: '',
      PCParentCategoryId: '',
      PCDescription: '',
      PCNewURL: '',
      OrganiztionId: '',
      PCMetaDataTitle: '',
      WebSiteName: '',
      PCMetaDataKeywords: '',
      PCOldURL: '',
      access_token: '',
      user_id: ''

    };
    this.editor = new Editor();
    this.html = '';
    this.access_token = '';

    const navigation: any = this.router.getCurrentNavigation();
    if (navigation !== null) {
      const state = navigation.extras.state as {
        productcategory: IProductCategory
      };

      this.productcategory = state.productcategory;
    }

  }


  ngOnInit(): void {

    console.log('In Page Detail ngOnInit');
    this.form.controls.PCNewUrl.setValue([this.productcategory.PCNewURL]);
    this.form.controls.PCOldUrl.setValue([this.productcategory.PCOldURL]);

    this.form.controls.PCName.setValue([this.productcategory.PCName]);

    this.form.controls.PCDescription.setValue([this.productcategory.PCDescription]);
    this.form.controls.PCMetaDataTitle.setValue([this.productcategory.PCMetaDataTitle]);

    this.form.controls.PCMetaDataKeywords.setValue([this.productcategory.PCMetaDataKeywords]);
    this.form.controls.PCMetaDataDescription.setValue([this.productcategory.PCMetaDataDescription]);


  }

  updateProductCategory() {

    this.websiteName = this.websiteService.getCurrentWebsiteName();

    const productCategory: IProductCategory = {
      id: '',
      WebSiteName: '',
      PCName: '',
      PCMetaDataDescription: '',
      PCParentCategoryId: '',
      PCDescription: '',
      PCNewURL: '',
      OrganiztionId: '',
      PCMetaDataTitle: '',
      PCMetaDataKeywords: '',
      PCOldURL: '',
      access_token: '',
      user_id: ''
    };

    productCategory.WebSiteName = this.websiteName;
    productCategory.id = this.productcategory.id;

    productCategory.PCNewURL = this.form.controls.PCNewURL.value;
    productCategory.PCOldURL = this.form.controls.PCOldURL.value;

    productCategory.PCName = this.form.controls.PCName.value;
    productCategory.PCDescription = this.form.controls.PCDescription.value;

    productCategory.PCMetaDataTitle = this.form.controls.PCMetaDataTitle.value;
    productCategory.PCMetaDataKeywords = this.form.controls.PCMetaDataKeywords.value;
    productCategory.PCMetaDataDescription = this.form.controls.PCMetaDataDescription.value;

    return new Promise<any>((resolve, reject) => {

      this.productcategoryService.updateProductCategory(productCategory, this.access_token).then((val: any) => {

        if (val.status === UPDATE_PRODUCT_CATEGORY) {
          console.log('POST call successful value returned in body',
            val);
          this.router.navigate(['multisite', 'listProductCategories']);

          // OQ : why is this resolve method used here
          resolve(val);
        } else {
          alert('You are not authorized to perform this operation');

          // OQ : why is this reject method used here
          reject(val);
        }
      });

    });

  }

  ngOnDestroy(): void {
    // this.editor.destroy();
  }
}
