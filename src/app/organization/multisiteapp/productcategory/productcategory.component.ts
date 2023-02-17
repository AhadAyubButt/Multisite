/* tslint:disable:variable-name */
import {Component, HostListener, OnInit} from '@angular/core';
import {ProductcategoryService} from '../../../Services/productcategory.service';
import {FormControl, FormGroup} from '@angular/forms';
import {WebsiteService} from '../../../Services/website.service';
import {Editor, Toolbar} from 'ngx-editor';
import {Router} from '@angular/router';
import {IProductCategory} from '../../../Interfaces/product_category_interface';
import {CREATE_PRODUCT_CATEGORY} from 'src/assets/error.contants';
import {Observable} from "rxjs";


@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})

export class ProductcategoryComponent implements OnInit {

  productcategoryService: ProductcategoryService;
  websiteService: WebsiteService;
  router: Router;
  websiteName: string;
  access_token: string;


  form = new FormGroup({

    PCNewURL: new FormControl(''),
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
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  html = '';
  proceed: Observable<boolean> | boolean = false;

  constructor(productcategoryService: ProductcategoryService, websiteService: WebsiteService,
              _router: Router,
  ) {

    this.productcategoryService = productcategoryService;
    this.websiteService = websiteService;
    this.router = _router;
    this.websiteName = websiteService.getCurrentWebsiteName();
    console.log('In product category current website name is ' + this.websiteName);
    this.editor = new Editor();
    this.html = '';
    this.access_token = '';

  }

  ngOnInit(): void {

  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  createProductCategory() {
    this.proceed = confirm("Are you sure you want to proceed?");
    if (this.proceed) {

      this.websiteName = this.websiteService.getCurrentWebsiteName();

      const productCategory: IProductCategory = {

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

      productCategory.WebSiteName = this.websiteName;
      productCategory.PCNewURL = this.form.controls.PCNewURL.value;
      productCategory.PCName = this.form.controls.PCName.value;
      productCategory.PCDescription = this.form.controls.PCDescription.value;

      productCategory.PCMetaDataTitle = this.form.controls.PCMetaDataTitle.value;
      productCategory.PCMetaDataKeywords = this.form.controls.PCMetaDataKeywords.value;
      productCategory.PCMetaDataDescription = this.form.controls.PCMetaDataDescription.value;

      this.access_token = '';

      let user_id: string = '';

      productCategory.user_id = user_id;

      this.productcategoryService.createProductCategory(productCategory).then((val: any) => {

        if (val.status === CREATE_PRODUCT_CATEGORY) {
          console.log('POST call successful value returned in body',
            val);
          this.router.navigate(['multisite', 'listProductCategories']);

          // OQ : why is this resolve method used here
        } else {
          alert('You are not authorized to perform this operation');

          // OQ : why is this reject method used here
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
