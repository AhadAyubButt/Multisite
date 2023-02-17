// src/app/components/login-button/login-button.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: [],
})
export class LoginButtonComponent implements OnInit {
  constructor( ) {}
  loginWithRedirect(): void {
    //
    // this.auth.idTokenClaims$.toPromise().then((val) => {
    //   console.log('id token value is ' + val);
    //
    // });
    //
    // this.auth.user$.toPromise().then((val) => {
    //   console.log('authenticated user value is ' + val);
    // });
    //
    // this.auth.loginWithRedirect();


  }

  ngOnInit(): void {
    this.loginWithRedirect();
  }

}
