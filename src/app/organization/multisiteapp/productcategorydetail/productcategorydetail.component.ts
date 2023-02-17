import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductcategoryService } from '../../../Services/productcategory.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';


@Component({
  selector: 'app-productcategorydetail',
  templateUrl: './productcategorydetail.component.html',
  styleUrls: ['./productcategorydetail.component.css']
})

export class ProductcategorydetailComponent implements OnInit {

  // All keys should come from one file
  constructor(productcategoryService: ProductcategoryService, @Inject(LOCAL_STORAGE) private storage: StorageService,
              ) {

    this.productcategoryService = productcategoryService;


    this.access_token = '';


  }

  form = new FormGroup({

    productcategoryurl: new FormControl(''),
    productcategoryname: new FormControl(''),

    productcategorydescription: new FormControl(''),
    productcategorymetatitle: new FormControl(''),

    productcategorymetakeywords: new FormControl(''),
    productcategorymetadescription: new FormControl('')

  });

  productCategoryName: string = '';
  productcategory: any;
  productcategoryService: ProductcategoryService;
  access_token: string;


  ngOnInit(): void {

    console.log('In Page Detail ngOnInit');

    let websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);


    this.access_token = '';

    const user_id = '';

    this.productcategoryService.listProductCategories(websitename, this.access_token, user_id).then(() => {
      this.productCategoryName = this.productcategoryService.getCurrentProductCategoryName();
      this.productcategory = this.productcategoryService.getProductCategoryByName(this.productCategoryName);

      this.form.controls['productcategoryurl'].setValue(this.productcategory.PCURL);
      this.form.controls['productcategoryname'].setValue(this.productcategory.PCName);

      this.form.controls['productcategorydescription'].setValue(this.productcategory.PCDescription);
      this.form.controls['productcategorymetatitle'].setValue(this.productcategory.PCMetaDataTitle);

      this.form.controls['productcategorymetakeywords'].setValue(this.productcategory.PCMetaDataKeywords);
      this.form.controls['productcategorymetadescription'].setValue(this.productcategory.PCMetaDataDescription);
    });
  }

}
