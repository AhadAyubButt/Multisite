
import { Injectable } from '@angular/core';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';
import { HttpService } from './http.service';
import {IAllBlogs} from "../Interfaces/allblogs_interface";

@Injectable({
  providedIn: 'root'
})

export class   AllblogsService {

  allBlogsList: Array<IAllBlogs> = [];
  currentAllProductsPageName:string;

  constructor(private httpService: HttpService) {
    this.currentAllProductsPageName = ''
  }

  public createAllBlogs(allBlogs:IAllBlogs) {
    return this.httpService.createAllBlogs(allBlogs);
  }

  public getallblogsById(allBlogsId:string) {

    for(let i = 0;i < this.allBlogsList.length;i++) {

      if(this.allBlogsList[i].id == allBlogsId) {
        return this.allBlogsList[i];
      }

    }

    // If there is not matching allProducts, return first allProductsPage
    return this.allBlogsList[0];
  }

  public updateAllBlogs(allBlogs:IAllBlogs) {
    return this.httpService.updateAllBlogs(allBlogs);
  }

  public listAllBlogs(websiteName:string, access_token:string, user_id:string) {

    this.allBlogsList = [];

    var promise = new Promise<any>((resolve, reject) => {

      this.httpService.listAllBlogs(websiteName, access_token, user_id as string).then((returnValue) => {

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

            let allBlogs:IAllBlogs = {

              id:"",
              OrganiztionId:"",
              WebsiteName:"",

              AllBlogsNewUrl:"",
              AllBlogsOldUrl:"",

              AllBlogsPageName:"",

              AllBlogsMetaTitle:"",
              AllBlogsMetaKeywords:"",
              AllBlogsMetaDescription:"",

            }

            let allBlogsObject = array[i] as any;

            allBlogs.id = allBlogsObject["id"];
            allBlogs.WebsiteName = allBlogsObject["WebSiteName"];

            allBlogs.AllBlogsNewUrl = allBlogsObject["AllBlogsNewUrl"];
            allBlogs.AllBlogsOldUrl = allBlogsObject["AllBlogsOldUrl"];

            allBlogs.AllBlogsPageName = allBlogsObject["AllBlogsPageName"];
            allBlogs.AllBlogsMetaTitle = allBlogsObject["AllBlogsMetaTitle"];
            allBlogs.AllBlogsMetaKeywords = allBlogsObject["AllBlogsMetaKeywords"];
            allBlogs.AllBlogsMetaDescription = allBlogsObject["AllBlogsMetaDescription"];

            this.allBlogsList.push(allBlogs);
          }

          console.log(this.allBlogsList);
          resolve(this.allBlogsList);

        }
      });
    });

    return promise;

  }



}
