/* tslint:disable:variable-name */
import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { STORAGE_KEY_CURRENT_BLOG_NAME } from '../localstoragekeys';
import { IBlog } from '../Interfaces/blog_interface';
import { NOT_AUTHORIZED } from 'src/assets/error.contants';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  blogsList: Array<IBlog> = [];

  currentBlogName: string;
  s3config: object = {};

  constructor(
    private httpService: HttpService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.currentBlogName = '';
    this.currentBlogName = this.storage.get(STORAGE_KEY_CURRENT_BLOG_NAME);
  }

  createImage(websitename: string, name: string, file: string): string {
    return this.httpService.createImage(websitename, name, file);
  }

  getBlogByName(blogName: string): IBlog | void {
    return this.blogsList.forEach((value) => {
      return value.BlogName === blogName;
    });
    // for (let i = 0; i < this.blogsList.length; i++) {
    //   if (this.blogsList[i].BlogName === blogName) {
    //     return this.blogsList[i];
    //   }
    // }
    // If there is not matching blog, return first blog
    // return this.blogsList[0];
  }

  updateBlog(blog: IBlog, access_token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService.updateBlog(blog).then((returnValue) => {
        console.log('Return value of update blog is ' + returnValue);
        resolve(returnValue);
      });
    });

    // return this.httpService.updateBlog(blog, access_token);
  }

  createBlog(blog: IBlog, access_token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService.createBlog(blog).then((returnValue) => {
        console.log('Return value of create blog is ' + returnValue);
        resolve(returnValue);
      });
    });
  }

  listBlogs(websitename: string, access_token: string, user_id: string): Promise<any> {
    this.blogsList = [];

    return new Promise<any>((resolve, reject) => {
      this.httpService
        .listBlogs(websitename, access_token, user_id)
        .then((returnValue) => {
          console.log('websites are: ' + returnValue);

          let items: Array<any>;
          items = [];
          const retValue: any = returnValue?.body as any;
          if (retValue.status === NOT_AUTHORIZED) {
            alert('You are not authorized to perform this operation.');
            reject(NOT_AUTHORIZED);
          } else {
            const array: Array<string> = retValue.Items;

            array.forEach(item => {

              const blog: IBlog = {
                BlogAltText: '',
                BlogDescription: '',
                BlogImageURL: '',
                BlogImageURL1: '',
                BlogImageURL2: '',
                BlogImageURL3: '',
                BlogImageURL4: '',
                BlogMetaDataDescription: '',
                BlogMetaDataKeywords: '',
                BlogMetaDataTitle: '',
                BlogName: '',
                BlogNewURL: '',
                BlogOldURL: '',
                BlogSchema: '',
                Featured_Blog_Flag: '',
                OrganiztionId: '',
                WebSiteName: '',
                id: '',
                DelFlag: ''
              };

              const blogObject = item as any;

              blog.id = blogObject.id;
              blog.WebSiteName = blogObject.WebSiteName;
              blog.BlogName = blogObject.BlogName;
              
              blog.BlogAltText = blogObject.BlogAltText;
              blog.DelFlag = blogObject.DelFlag;

              blog.BlogSchema = blogObject.BlogSchema;
              blog.BlogImageURL = blogObject.BlogImageURL;

              blog.BlogNewURL = blogObject.BlogNewURL;
              blog.BlogOldURL = blogObject.BlogOldURL;

              blog.BlogMetaDataTitle = blogObject.BlogMetaDataTitle;
              blog.BlogMetaDataKeywords = blogObject.BlogMetaDataKeywords;
              blog.BlogMetaDataDescription = blogObject.BlogMetaDataDescription;

              blog.BlogDescription = blogObject.BlogDescription;

              this.blogsList.push(blog);
            });
            console.log(this.blogsList);
            resolve(this.blogsList);
          }
        });
    });
  }

  setCurrentBlogName(blogName: string): void {
    this.currentBlogName = blogName;
    this.storage.set(STORAGE_KEY_CURRENT_BLOG_NAME, this.currentBlogName);
  }

  getCurrentBlogName(): string {
    this.currentBlogName = this.storage.get(STORAGE_KEY_CURRENT_BLOG_NAME);
    return this.currentBlogName;
  }

  deleteBlog(id: string): Promise<any> {
    return this.httpService.deleteBlog(id);
  }

  readBlog(id: string, accessToken: string, userId: string): Promise<any> {
    return this.httpService.readBlog(id, accessToken, userId);
  }
}
