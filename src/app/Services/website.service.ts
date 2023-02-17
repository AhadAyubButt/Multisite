/* tslint:disable:variable-name */
import {HttpService} from './http.service';
import {STORAGE_KEY_CURRENT_WEBSITE_NAME} from '../localstoragekeys';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import {NOT_AUTHORIZED} from 'src/assets/error.contants';
import {Observable, Observer, Subject} from 'rxjs';
import {IWebSite} from "../Interfaces/website_interface";

@Injectable({
  providedIn: 'root'
})

export class WebsiteService {

  websiteName: string = '';
  isWebsiteSelected$: Observable<boolean> = new Observable(this.websiteSelectedSubscriber);
  isWebsiteSelected: boolean = false;
  subject: Subject<string> = new Subject<string>();
  websiteLogo: string = '';
  websiteList: Array<IWebSite> = [];

  constructor(private httpService: HttpService, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.isWebsiteSelected$.subscribe((websiteSelected) => {
      console.log('website selected value is ' + websiteSelected);
    });
    this.listWebsites('','');
  }

  selectWebsite() {
    this.isWebsiteSelected = true;
  }

  deselectWebsite() {
    this.subject.next('');
    this.isWebsiteSelected = false;
    this.websiteName = '';

  }

  onWebsiteChangeEvent(val: string): void {
    this.subject.next(val);
  }
  websiteSelectedSubscriber(observer: Observer<any>): { unsubscribe(): void } {

    // let websiteSelect = MultisiteAppComponent.websiteService.isWebsiteSelected();
    // console.log("In observable : website selected value is " + websiteSelect)

    observer.next(true);
    observer.complete();

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return {
      unsubscribe() {
      }
    };
  }

  setCurrentWebsiteName(website: IWebSite) {
    //  this.websiteSelected = true;
    this.websiteName = website.websiteName;
    // this.detector.emit(true);
    this.storage.set(STORAGE_KEY_CURRENT_WEBSITE_NAME, this.websiteName);
    console.log('Name of website in website service set method is ' + this.websiteName);
    this.onWebsiteChangeEvent(website.Logo);
  }

  getCurrentWebsiteName(): string {
    // console.log('Name of website in website service get method is ' + this.websiteName);
    this.websiteName = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);
    return this.websiteName;
  }

  getCurrentWebsiteLogoob(): Observable<string> {
    console.log('Name of website in website service get method is ' + this.websiteLogo);
    this.websiteName = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);
    return this.subject.asObservable();
  }


  createWebsite(website: IWebSite, access_token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService.createWebsite(website).then((returnValue) => {
        console.log('Return value of create website is ' + returnValue);
        resolve(returnValue);
      });
    });
  }

  createImage(websitename: string, name: string, file: string): string {
    return this.httpService.createImage(websitename, name, file);
  }

  listWebsites(access_token: string, user_id: string) {

    this.websiteList = [];
    this.httpService.listWebsites(access_token, user_id).then((returnValue: any) => {
      console.log(returnValue.body.Items);
      returnValue.body.Items.forEach((val:any)=>{
        this.websiteList.push({
          websiteName: val.Name,
          websiteImageURL: val.ImageURL,
          id: val.id,
          Logo: val.Logo,
          OrganizationId: val.OrganizationId
        })
      });
      //return this.httpService.listWebsites().toPromise();

      console.log(returnValue.body.Items);
      /*
      .then((returnValue) => {


        let items:Array<any>;
        items = [];
        let retValue: any = returnValue["body"] as any;
        let array:Array<string> = retValue["Items"];

        for(let i = 0;i < array.length;i++) {
          this.websiteList.push(array[i]);
        }

        this.storage.set(STORAGE_KEY_CURRENT_WEBSITE_NAME, this.websiteName);


        console.log(this.websiteList);
     }); */
    })
  }

  listWebsitePages(): Promise<object | undefined> {
    return this.httpService.listWebsitePages();
  }
}
