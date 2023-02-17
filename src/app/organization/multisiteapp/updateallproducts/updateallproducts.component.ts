import { Component, Inject, OnInit } from '@angular/core';
import { AllproductsService } from '../../../Services/allproducts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Editor, Toolbar } from 'ngx-editor';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { WebsiteService } from '../../../Services/website.service';
import { Router } from '@angular/router';
import { IAllProducts } from '../../../Interfaces/allproducts_interface';

@Component({
  selector: 'app-updateallproducts',
  templateUrl: './updateallproducts.component.html',
  styleUrls: ['./updateallproducts.component.css']
})

export class UpdateallproductsComponent implements OnInit {

  constructor(private allproductssService: AllproductsService,
              private websiteService: WebsiteService,
              private router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {



    this.editor = new Editor();
    this.html = '';
    this.websiteName = '';
    this.access_token = '';

    this.allproducts = {
      id: '',
      OrganiztionId: '',
      WebsiteName: '',
      AllProductsNewUrl: '',
      AllProductsOldUrl: '',
      AllProductsPageName: '',
      AllProductsMetaTitle: '',
      AllProductsMetaKeywords: '',
      AllProductsMetaDescription: '',
    };

    const navigation: any = this.router.getCurrentNavigation();
    if (null != navigation) {
      const state = navigation.extras.state as {
        allproducts: IAllProducts
      };

      this.allproducts = state.allproducts;
    }

  }

  form = new FormGroup({
    id: new FormControl(''),
    OrganizationId: new FormControl(''),
    WebsiteName: new FormControl(''),
    AllProductsNewUrl: new FormControl(''),
    AllProductsOldUrl: new FormControl(''),
    AllProductsPageName: new FormControl(''),
    AllProductsMetaTitle: new FormControl(''),
    AllProductsMetaKeywords: new FormControl(''),
    AllProductsMetaDescription: new FormControl('')

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

  allproductsName: string = '';
  allproducts: IAllProducts;
  websiteName: string;
  access_token: string;

  ngOnInit(): void {

    console.log('In Page Detail ngOnInit');
    let websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.form.controls['AllProductsNewUrl'].setValue(this.allproducts.AllProductsNewUrl);
    this.form.controls['AllProductsOldUrl'].setValue(this.allproducts.AllProductsOldUrl);
    this.form.controls['AllProductsPageName'].setValue(this.allproducts.AllProductsPageName);
    this.form.controls['AllProductsMetaTitle'].setValue(this.allproducts.AllProductsMetaTitle);
    this.form.controls['AllProductsMetaKeywords'].setValue(this.allproducts.AllProductsMetaKeywords);
    this.form.controls['AllProductsMetaDescription'].setValue(this.allproducts.AllProductsMetaDescription);

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  updateAllProducts() {

    console.log('updateAllProducts method called');
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    let allproducts: IAllProducts = {
      id: '',
      OrganiztionId: '',
      WebsiteName: '',
      AllProductsNewUrl: '',
      AllProductsOldUrl: '',
      AllProductsPageName: '',
      AllProductsMetaTitle: '',
      AllProductsMetaKeywords: '',
      AllProductsMetaDescription: '',
    };

    allproducts.WebsiteName = this.websiteName;

    allproducts.AllProductsNewUrl = this.form.controls.AllProductsNewUrl.value;
    allproducts.AllProductsOldUrl = this.form.controls.AllProductsOldUrl.value;
    allproducts.AllProductsPageName = this.form.controls.AllProductsPageName.value;
    allproducts.id = this.allproducts.id;
    allproducts.AllProductsMetaTitle = this.form.controls.AllProductsMetaTitle.value;
    allproducts.AllProductsMetaKeywords = this.form.controls.AllProductsMetaKeywords.value;
    allproducts.AllProductsMetaDescription = this.form.controls.AllProductsMetaDescription.value;

    var promise = new Promise<any>((resolve, reject) => {



      this.allproductssService.updateAllProducts(allproducts).then((val) => {
        console.log('POST call successful value returned in body',
          val);
        this.router.navigate(['multisite', 'listAllProductsPage']);
        resolve(val);
      });
    });

    return promise;

  }
}
