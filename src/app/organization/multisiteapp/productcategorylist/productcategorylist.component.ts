/* tslint:disable:variable-name */
import { Component, Inject, OnInit } from '@angular/core';
import { ProductcategoryService } from '../../../Services/productcategory.service';
import { WebsiteService } from '../../../Services/website.service';
import { NavigationExtras, Router } from '@angular/router';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IProductCategory } from '../../../Interfaces/product_category_interface';


@Component({
  selector: 'app-productcategorylist',
  templateUrl: './productcategorylist.component.html',
  styleUrls: ['./productcategorylist.component.css'],
})
export class ProductcategorylistComponent implements OnInit {
  constructor(
    private productcategoryService: ProductcategoryService,
    private websiteService: WebsiteService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {

    this.access_token = '';
  }

  productCategoryList: Array<IProductCategory> = [];
  access_token: string;

  ngOnInit(): void {
    console.log('Page list');
    this.productCategoryList = [];
    this.listProductCategories();
  }

  viewProductCategory(PCName: string): void {
    this.productcategoryService.setCurrentProductCategoryName(
      PCName
    );
    this.router.navigate(['multisite', 'viewProductCategory']);
  }

  addProductCategory(): void {
    this.router.navigate(['multisite', 'createProductCategory']);
  }

  editProductCategory(PCName: string): void {
    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.productcategoryService
      .listProductCategories(websitename, '', '')
      .then(() => {
        let productCategoryInList = this.productcategoryService.getProductCategoryByName(
          PCName
        );
        const navigationExtras: NavigationExtras = {
          state: {
            productcategory: productCategoryInList,
          },
        };

        this.router.navigate(
          ['multisite', 'updateProductCategory'],
          navigationExtras
        );
      });
  }

  listProductCategories(): void {
    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();

    this.access_token = '';

    let user_id: string = '';

    this.productcategoryService
      .listProductCategories(websiteName, this.access_token, user_id)
      .then((productCategoryList) => {
        this.productCategoryList = [];
        this.productCategoryList = productCategoryList;
      });
  }
}
