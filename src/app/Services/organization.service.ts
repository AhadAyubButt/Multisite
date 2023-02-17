import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import {IUser} from "../Interfaces/user_interface";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }
  private user?: IUser;
  private _isAuthenticated: boolean;
  constructor(private httpService: HttpService) {
    this._isAuthenticated= false;
  }

  onLogin(user: IUser): Observable<HttpResponse<object>|undefined> {
    this.user = user;
    return this.httpService.onLogin(user);
  }
}
