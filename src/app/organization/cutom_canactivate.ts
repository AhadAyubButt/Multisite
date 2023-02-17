import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {OrganizationService} from "../Services/organization.service";

// class UserToken {
//   get state(): boolean {
//     return this._state;
//   }
//
//   set state(value: boolean) {
//     this._state = value;
//   }
//
//   private _state: boolean = false;
// }

// class permissions {
//   canActivate(user: UserToken, id: string): boolean {
//     return true;
//   }
// }

@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(private orgService: OrganizationService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.orgService.isAuthenticated) {
      this.router.navigate(['org'])
      alert('you are not allowed to view this page');
      return false;
    }
    console.log(route);
    console.log(state);
    return true;
  }
}
