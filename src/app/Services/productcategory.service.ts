
import { HttpService } from './http.service';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'
import {STORAGE_KEY_CURRENT_WEBSITE_NAME} from '../localstoragekeys'
import {STORAGE_KEY_CURRENT_PRODUCT_CATEGORY} from '../localstoragekeys'
import { IProductCategory } from '../Interfaces/product_category_interface'
import { NOT_AUTHORIZED } from 'src/assets/error.contants';

/**
Changes for the refresh page data removal issue

Entity Service File
========================
setCurrentEntityName

Within this method store the variable value in storage

getCurrentEntityName

Within this method get the variable value from storage

entityConstructor

Within this method get the variable value from storage

Within the Entity Detail PageTransitionEvent
===============================================

Get the website name from the Storage

Call the list entity page and within that list entity then block, get the entity from the service and fill the form using the data from the entity

The getEntityByName method requires that the list is already fetched, before it can return entity

 */


@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  createProductCategory(productCategory:IProductCategory) {
    return this.httpService.createProductCategory(productCategory);
  }

  listProductCategories(websitename:string, access_token:string, user_id:string) {

    this.productsCategoryList = [];

      var promise = new Promise<any>((resolve, reject) => {
        this.httpService.listProductCategories(websitename, access_token, user_id).then((returnValue) => {

          console.log("websites are: " + returnValue);

          let items:Array<any>;
          items = [];
          let retValue: any = returnValue?.body as any;

          if(retValue == NOT_AUTHORIZED) {
            alert('You are not authorized to perform this operation.');
            // This should be rejected and user should show proper values here
            resolve(NOT_AUTHORIZED);
          } else {
            let array:Array<string> = retValue["Items"];

            for(let i = 0;i < array.length;i++) {

              let productCategory:IProductCategory = {
                id:"",
                PCName:"",
                PCMetaDataDescription: "",
                PCParentCategoryId : "",
                PCDescription : "",
                PCNewURL: "",
                OrganiztionId: "",
                PCMetaDataTitle: "",
                WebSiteName: "",
                PCMetaDataKeywords: "",
                PCOldURL: "",
                access_token:"",
                user_id:""
              }

              let productCategoryObject = array[i] as any;

              productCategory.id = productCategoryObject.id;
              productCategory.WebSiteName = productCategoryObject.WebSiteName;
              productCategory.PCParentCategoryId = productCategoryObject.PCParentCategoryId;

              productCategory.PCNewURL = productCategoryObject.PCNewURL;
              productCategory.PCOldURL = productCategoryObject.PCOldURL;

              productCategory.PCName = productCategoryObject.PCName;
              productCategory.PCDescription = productCategoryObject.PCDescription;

              productCategory.PCMetaDataTitle = productCategoryObject.PCMetaDataTitle;
              productCategory.PCMetaDataKeywords = productCategoryObject.PCMetaDataKeywords;
              productCategory.PCMetaDataDescription = productCategoryObject.PCMetaDataDescription;

              this.productsCategoryList.push(productCategory);
            }

            // Is this line required? Where should it be placed?
            this.storage.set(STORAGE_KEY_CURRENT_WEBSITE_NAME, websitename);

            // Store the current productCategory name in the local store
            console.log(this.productsCategoryList);

            resolve(this.productsCategoryList);

          }

    })
  });

  return promise;

}

productsCategoryList: Array<IProductCategory> = [];
currentProductCategoryName:string;

setCurrentProductCategoryName(productName: string) {
  this.currentProductCategoryName = productName;
  this.storage.set(STORAGE_KEY_CURRENT_PRODUCT_CATEGORY, this.currentProductCategoryName);
}

getCurrentProductCategoryName() {
  this.currentProductCategoryName = this.storage.get(STORAGE_KEY_CURRENT_PRODUCT_CATEGORY);
  return this.currentProductCategoryName;
}

getProductCategoryByName(PCName:string) {

  for(let i = 0;i < this.productsCategoryList.length;i++) {
    if(this.productsCategoryList[i].PCName == PCName) {
      return this.productsCategoryList[i];
    }
  }

  return null;
}

getProductsCategoryList() {
  return this.productsCategoryList;
}

  constructor(private httpService: HttpService, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    console.log("product category service constructor")

    this.currentProductCategoryName = "";
    this.currentProductCategoryName = this.storage.get(STORAGE_KEY_CURRENT_PRODUCT_CATEGORY);

  }

  updateProductCategory(productCategory:IProductCategory, access_token:any) {
      return this.httpService.updateProductCategory(productCategory, access_token);
  }


}
