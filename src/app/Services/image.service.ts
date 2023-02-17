import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class ImageService {

  constructor(private httpClient: HttpClient, private httpService: HttpService) {
  }


  getImage(imageUrl: string): Observable<any> {

    console.log('Image URL before replacing is ' + imageUrl);
    // imageUrl = imageUrl.replace('https', 'http');
    console.log('Image URL after replacing is ' + imageUrl);

    // console.log('Image URL before aws path replacement' + imageUrl )
    // imageUrl = imageUrl.replace("http://tri-tech-images-bucket.s3-us-west-2.amazonaws.com/", "")
    // console.log('Image URL after aws path replacement' + imageUrl )

    return this.httpClient.get(imageUrl, {responseType: 'blob'});

  }

  getImagefromS3(): Promise<any> {
    return this.httpService.getImageFromS3();
  }


}
