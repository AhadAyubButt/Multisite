import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styles: [
  ]
})
export class AuthNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/multisite', 'listWebsite']).then();
  }

}
