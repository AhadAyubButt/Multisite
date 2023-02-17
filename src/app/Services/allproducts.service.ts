
import { Injectable } from '@angular/core';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';
import { IAllProducts } from '../Interfaces/allproducts_interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class AllproductsService {

  allProductsList: Array<IAllProducts> = [];
  currentAllProductsPageName:string;

  constructor(private httpService: HttpService) {
    this.currentAllProductsPageName = '';
  }

  public createAllProducts(allProducts:IAllProducts) {
    return this.httpService.createAllProducts(allProducts);
  }

  public updateAllProducts(allProducts:IAllProducts) {
    return this.httpService.updateAllProducts(allProducts);
  }

  public readAllProducts() {
    return this.httpService.readAllProducts();
  }

  public listAllProducts(websiteName:string, access_token:string, user_id:string) {

    this.allProductsList = [];

    var promise = new Promise<any>((resolve, reject) => {

      this.httpService.listAllProducts(websiteName, access_token, user_id as string).then((returnValue) => {
        let jsonObject:any;
        let websitObject:any;
        console.log("websites are: " + returnValue);

        let items:Array<any>;
        items = [];
        let retValue: any= returnValue?.body as any;
        if (retValue["status"] == NOT_AUTHORIZED) {

          alert("You are not authorized to perform this operation.");
          reject(NOT_AUTHORIZED);

        } else {

          let array:Array<string> = retValue["Items"];

          for(let i = 0;i < array.length;i++) {

            let allProducts:IAllProducts = {

              id:"",
              OrganiztionId:"",
              WebsiteName:"",

              AllProductsNewUrl:"",
              AllProductsOldUrl:"",

              AllProductsPageName:"",

              AllProductsMetaTitle:"",
              AllProductsMetaKeywords:"",
              AllProductsMetaDescription:"",

            }

            let allProductsObject = array[i] as any;

            allProducts.id = allProductsObject["id"];
            allProducts.WebsiteName = allProductsObject["WebSiteName"];

            allProducts.AllProductsNewUrl = allProductsObject["AllProductsNewUrl"];
            allProducts.AllProductsOldUrl = allProductsObject["AllProductsOldUrl"];

            allProducts.AllProductsPageName = allProductsObject["AllProductsPageName"];
            allProducts.AllProductsMetaTitle = allProductsObject["AllProductsMetaTitle"];
            allProducts.AllProductsMetaKeywords = allProductsObject["AllProductsMetaKeywords"];
            allProducts.AllProductsMetaDescription = allProductsObject["AllProductsMetaDescription"];

            this.allProductsList.push(allProducts);
          }

          console.log(this.allProductsList);
          resolve(this.allProductsList);

        }
      });
    });

    return promise;

  }

  public getallproductsById(allProductsId:string) {

    for(let i = 0;i < this.allProductsList.length;i++) {

      if(this.allProductsList[i].id == allProductsId) {
        return this.allProductsList[i];
      }
    }

    // If there is not matching allProducts, return first allProductsPage
    return this.allProductsList[0];
  }

}
