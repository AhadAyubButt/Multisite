/* tslint:disable:variable-name */
import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { STORAGE_KEY_CURRENT_PRODUCT_NAME } from '../localstoragekeys';
import { IProduct } from '../Interfaces/product_interface';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // getProductsList() {
  //     return this.productsList;
  //  }

  constructor(
    private httpService: HttpService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.currentProductName = '';
    this.currentProductName = this.storage.get(
      STORAGE_KEY_CURRENT_PRODUCT_NAME
    );
  }

  productsList: Array<IProduct> = [];

  currentProductName: string;

  createImage(websitename: string, name: string, file: string): string {
    return this.httpService.createImage(websitename, name, file);
  }

  listProducts(
    websitename: string,
    access_token: string,
    user_id: string
  ): Promise<any> {
    // Find out why this is called multiple times. Number of API calls is to be reduced.

    // TODO : Handle the failure scenarios, use reject also
    return new Promise<any>((resolve, reject) => {
      this.httpService
        .listProducts(websitename, access_token, user_id)
        .then((returnValue) => {
          console.log('websites are: ' + returnValue);
          const retValue: any = returnValue?.body as any;
          // console.log('retvalue array: ' + JSON.stringify(retValue));
          if (retValue === NOT_AUTHORIZED) {
            alert('You are not authorized to perform this operation.');
            resolve(NOT_AUTHORIZED);

          } else {
            const array: Array<string> = retValue.Items;
            // console.log('array is: ' + JSON.stringify(array));
            this.productsList = [];
            array.forEach((item) => {
              const product: IProduct = {
                DelFlag: "",
                id: '',
                OrganiztionId: '',
                ProductAltText1: '',
                ProductAltText2: '',
                ProductAltText3: '',
                ProductAltText4: '',
                ProductAltText5: '',
                ProductCategory: '',
                ProductSchema: '',
                ProductDetailedDescription: '',
                ProductImageURL1: '',
                ProductImageURL2: '',
                ProductImageURL3: '',
                ProductImageURL4: '',
                ProductImageURL5: '',
                ProductMetaDataDescription: '',
                ProductMetaDataKeywords: '',
                ProductMetaDataTitle: '',
                ProductName: '',
                ProductNewURL: '',
                ProductOldURL: '',
                ProductRelatedProductId1: '',
                ProductRelatedProductId2: '',
                ProductRelatedProductId3: '',
                ProductRelatedProductId4: '',
                ProductRelatedProductId5: '',
                ProductShortDescription: '',
                WebSiteName: ''
              };

              const productObject = item as any;

              // TD : Only matching products should be returned from database
              if (websitename === productObject.WebSiteName) {
                product.DelFlag = productObject.DelFlag;
                product.id = productObject.id;
                product.ProductName = productObject.ProductName;

                product.ProductSchema = productObject.ProductSchema;

                product.ProductNewURL = productObject.ProductNewURL;
                product.ProductOldURL = productObject.ProductOldURL;

                product.WebSiteName = productObject.WebSiteName;

                product.ProductShortDescription =
                  productObject.ProductShortDescription;
                product.ProductDetailedDescription =
                  productObject.ProductDetailedDescription;

                product.ProductCategory = productObject.ProductCategory;

                product.ProductMetaDataTitle =
                  productObject.ProductMetaDataTitle;
                product.ProductMetaDataKeywords =
                  productObject.ProductMetaDataKeywords;
                product.ProductMetaDataDescription =
                  productObject.ProductMetaDataDescription;

                product.ProductImageURL1 = productObject.ProductImageURL1;
                product.ProductImageURL2 = productObject.ProductImageURL2;
                product.ProductImageURL3 = productObject.ProductImageURL3;
                product.ProductImageURL4 = productObject.ProductImageURL4;
                product.ProductImageURL5 = productObject.ProductImageURL5;

                product.ProductRelatedProductId1 =
                  productObject.ProductRelatedProductId1;
                product.ProductRelatedProductId2 =
                  productObject.ProductRelatedProductId2;
                product.ProductRelatedProductId3 =
                  productObject.ProductRelatedProductId3;
                product.ProductRelatedProductId4 =
                  productObject.ProductRelatedProductId4;
                product.ProductRelatedProductId5 =
                  productObject.ProductRelatedProductId5;
                product.ProductAltText1 = productObject.ProductAltText1;
                product.ProductAltText2 = productObject.ProductAltText2;
                product.ProductAltText3 = productObject.ProductAltText3;
                product.ProductAltText4 = productObject.ProductAltText4;
                product.ProductAltText5 = productObject.ProductAltText5;

                this.productsList.push(product);
              }
            });

            console.log(this.productsList);
            resolve(this.productsList);
          }
        });
    });
  }

  setCurrentProductName(productName: string): void {
    this.currentProductName = productName;
    this.storage.set(STORAGE_KEY_CURRENT_PRODUCT_NAME, this.currentProductName);
  }

  getCurrentProductName(): string {
    this.currentProductName = this.storage.get(
      STORAGE_KEY_CURRENT_PRODUCT_NAME
    );
    return this.currentProductName;
  }

  getProductByName(productName: string): IProduct | null {
    for (const item of this.productsList) {
      if (item.ProductName === productName) {
        return item;
      }
    }

    return null;
  }

  createProduct(product: IProduct): Promise<object|undefined> {
    return this.httpService.createProduct(product);
  }

  readProduct(id: string): Promise<object|undefined> {
    return this.httpService.readProduct(id);
  }

  updateProduct(product: IProduct): Promise<object|undefined> {
    return this.httpService.updateProduct(product);
  }

  deleteProduct(id: string): Promise<any> {
    return this.httpService.deleteProduct(id);
  }

  getImagefromS3(): Promise<any> {
    return this.httpService.getImageFromS3();
  }
}
