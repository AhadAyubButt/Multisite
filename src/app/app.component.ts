import { Component, OnInit } from '@angular/core';

declare let FB:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {}
  title = 'multisite';

  ngOnInit(): void {
    console.log('IN app Componenet');
    FB.getLoginStatus(function(response: { status: string; authResponse: { accessToken: any; }; }) {
      if (response.status === 'connected') {
        let accessToken = response.authResponse.accessToken;
        console.log(accessToken)
      }
    } );

  }
}
