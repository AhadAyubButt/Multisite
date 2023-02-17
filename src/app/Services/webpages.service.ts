import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {STORAGE_KEY_CURRENT_PAGE_NAME} from '../localstoragekeys'
import { IWebPage } from '../Interfaces/webpage_interface';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';

@Injectable({
  providedIn: 'root'
})

export class WebpagesService {

  pagesList: Array<IWebPage> = [];

  currentPageName:string;

  getPageByName(pageName:string) {

    for(let i = 0;i < this.pagesList.length;i++) {
      if(this.pagesList[i].pagename == pageName) {
        return this.pagesList[i];
      }
    }

    return null;
  }

  getPagesList() {
    return this.pagesList;
  }

  listPages(websitename:string, access_token:any, user_id:string) {

    this.pagesList = [];

    var promise = new Promise<any>((resolve, reject) => {
        this.httpService.listPages(websitename, access_token, user_id).then((returnValue) => {

          console.log("websites are: " + returnValue);

          let items:Array<any>;
          items = [];
          let retValue: any = returnValue?.body as any;

          if(retValue == NOT_AUTHORIZED) {
            alert("You are not authorized to perform this operation")
            reject(NOT_AUTHORIZED);
          } else {
            let array:Array<string> = retValue["Items"];

            for(let i = 0;i < array.length;i++) {

              let webpage:IWebPage = {
                id:"",
                websiteName:"",

                pageNewUrl:"",
                pageOldUrl:"",

                pagename:"",
                pagedescription:"",
                pagemetatitle:"",
                pagemetakeywords:"",
                pagemetadescription:"",
                pagetype:"",
                user_id:"",

              };

              let webPageObject =array[i] as any;

              webpage.id = webPageObject["id"]
              webpage.websiteName =  webPageObject["WebSiteName"]

              webpage.pageNewUrl =  webPageObject["SPNewURL"]
              webpage.pageOldUrl =  webPageObject["SPOldURL"]

              webpage.pagename = webPageObject["SPTitle"]
              webpage.pagedescription = webPageObject["SPDescription"]

              webpage.pagemetatitle = webPageObject["SPMetaDataTitle"]
              webpage.pagemetakeywords = webPageObject["SPMetaDataKeywords"]
              webpage.pagemetadescription = webPageObject["SPMetaDataDescription"]

              this.pagesList.push(webpage);
            }

            console.log(this.pagesList);
            resolve(this.pagesList);
          }
      });

    })

    return promise;

  }

  constructor(private httpService: HttpService,  @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.currentPageName = "";
    this.currentPageName = this.storage.get(STORAGE_KEY_CURRENT_PAGE_NAME);
  }

  createWebPage(webpage:IWebPage, access_token:string) {
    return this.httpService.createWebPage(webpage, access_token);
  }

  updatePage(webpage:IWebPage, access_token:any, user_id:string) {
      return this.httpService.updateStaticPage(webpage, access_token, user_id)
  }

}
