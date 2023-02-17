
import { Injectable } from '@angular/core';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';
import { IHomePage } from '../Interfaces/homepage_interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class HomepageService {

  homePageList: Array<IHomePage> = [];
  currentAllProductsPageName:string;

  constructor(private httpService: HttpService) {
    this.currentAllProductsPageName = ''
  }

  listHomePage(websitename:string, access_token:string, user_id:string) {

    this.homePageList = [];

    var promise = new Promise<any>((resolve, reject) => {

      this.httpService.listHomePage(websitename, access_token).then((returnValue) => {

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

            let homePage:IHomePage = {

              id:"",
              OrganiztionId:"",
              WebsiteName:"",

              HomePageName:"",
              HomePageNewUrl:"",
              HomePageOldUrl:"",

              HomePageMetaTitle:"",
              HomePageMetaKeywords:"",
              HomePageMetaDescription:"",

              access_token:"",
              user_id:""
            }

            let allHomePagesObject = array[i] as any;

            homePage.id = allHomePagesObject["id"];
            homePage.WebsiteName = allHomePagesObject["WebSiteName"];

            homePage.HomePageNewUrl = allHomePagesObject["HomePageNewUrl"];
            homePage.HomePageOldUrl = allHomePagesObject["HomePageOldUrl"];

            homePage.HomePageMetaTitle = allHomePagesObject["HomePageMetaTitle"];
            homePage.HomePageMetaKeywords = allHomePagesObject["HomePageMetaKeywords"];
            homePage.HomePageMetaDescription = allHomePagesObject["HomePageMetaDescription"];

            this.homePageList.push(homePage);
          }

          console.log(this.homePageList);
          resolve(this.homePageList);

        }
      });
    });

    return promise;

  }

  gethomepageByName(homepageName:string) {

    for(let i = 0;i < this.homePageList.length;i++) {

      if(this.homePageList[i].HomePageName == homepageName) {
        return this.homePageList[i];
      }

    }

    // If there is not matching allProducts, return first allProductsPage
    return this.homePageList[0];
  }

  updateHomePage(homepage:IHomePage) {
    return this.httpService.updateHomePage(homepage);
  }

  createHomePage(homepage:IHomePage) {
    return this.httpService.createHomePage(homepage);
  }

}
