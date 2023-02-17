import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { STORAGE_KEY_CURRENT_BLOG_NAME } from '../localstoragekeys';

@Injectable({
  providedIn: 'root'
})
export class ForalaImageService {
  currentBlogName = '';
  constructor(private httpService: HttpService, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.currentBlogName = this.storage.get(STORAGE_KEY_CURRENT_BLOG_NAME);
    // this.getImagefromS3();
  }

}
