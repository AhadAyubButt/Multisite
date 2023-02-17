
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ISocialMedia } from '../Interfaces/socialmedia_interface';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor(
    private httpService: HttpService,
  ) { }


  publishPost(post: ISocialMedia): Observable<object | undefined> {
    return this.httpService.publishPost(post);
  }
  createImage(image: any, name: string, file: string|ArrayBuffer|null): Observable<string> {
    return new Observable<string>((subscriber) => {
      const nam = this.httpService.createImage(image, name, file);
      subscriber.next(nam)
    })
    // image.replace('https','http');
  }
}
