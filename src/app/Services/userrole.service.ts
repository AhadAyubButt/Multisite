import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IUser } from '../Interfaces/user_interface';

@Injectable({
  providedIn: 'root'
})

export class UserroleService {

  httpService:HttpService;

  constructor(httpService:HttpService) {
    this.httpService = httpService;
  }

  userRolesList: Array<any> = [];

  getuserroleByName(userRoleName:string) {
    for(let i = 0;i < this.userRolesList.length;i++) {
      if(this.userRolesList[i].user_role_name == userRoleName) {
        return this.userRolesList[i];
      }
    }

    return null;
  }

  getUserRoleList() {
    return this.userRolesList;
  }

  updateUserRole(userRole:IUserRole) {
    return this.httpService.updateUserRole(userRole);
  }

  createUserRole(user:IUserRole) {
    return this.httpService.createUserRole(user);
  }

  listUserRole(websiteName:string) {

    this.userRolesList = [];

      var promise = new Promise<any>((resolve, reject) => {
        this.httpService.listUserRoles(websiteName).then((returnValue) => {

          console.log("websites are: " + returnValue);

          let items:Array<any>;
          items = [];
          //let jsonObject: JSON = returnValue["body"] as JSON;
          let jsonObject: any = returnValue["body"] as any;

          //let jsonObject: object = returnValue["body"] as object;
          let keys:any[] = Object.keys(jsonObject)

          for(let i = 0; i < keys.length;i++) {

            let userID:any = keys[i];
            let userRoleObject:string = jsonObject[userID];
            let userRoleJSON:any = JSON.parse(userRoleObject);

            let userRoleInfo = userRoleJSON["role"]
            let userRolePermissions = userRoleJSON["permissions"]

            userRoleInfo = JSON.parse(userRoleInfo);

            let userRole:IUserRole = {
              user_role_id:"",

              user_role_name:"",
              user_role_description:"",
              user_role_website_name:"",
              user_role_organization_id:"",
              product_create_permission:false,
              product_read_permission:false,
              product_update_permission:false,
              product_delete_permission:false,
              product_list_permission:false,

              product_category_create_permission:false,
              product_category_read_permission:false,
              product_category_update_permission:false,
              product_category_delete_permission:false,
              product_category_list_permission:false,


              blogs_create_permission:false,
              blogs_read_permission:false,
              blogs_update_permission:false,
              blogs_delete_permission:false,
              blogs_list_permission:false,

              webpages_create_permission:false,
              webpages_read_permission:false,
              webpages_update_permission:false,
              webpages_delete_permission:false,
              webpages_list_permission:false,
            }

            userRole.user_role_id = userRoleInfo["id"]
            userRole.user_role_name = userRoleInfo["name"]
            userRole.user_role_description = userRoleInfo["description"]

            userRolePermissions = JSON.parse(userRolePermissions);
            userRolePermissions = userRolePermissions["permissions"]

            for(let i = 0; i < userRolePermissions.length; i++) {
              let permissionObject = userRolePermissions[i];

              let permission = permissionObject["permission_name"]

              switch (permission) {
                case "create:product":
                  userRole.product_create_permission = true;
                  break;
                case "read:product":
                  userRole.product_read_permission = true;
                  break;
                case "update:product":
                  userRole.product_update_permission = true;
                  break;
                case "delete:product":
                  userRole.product_delete_permission = true;
                  break;
                case "list:product":
                  userRole.product_list_permission = true;
                  break;
                case "create:productcategory":
                  userRole.product_category_create_permission = true;
                  break;
                case "update:productcategory":
                  userRole.product_category_update_permission = true;
                  break;
                case "list:productcategory":
                  userRole.product_category_list_permission = true;
                  break;
                case "create:blog":
                  userRole.blogs_create_permission = true;
                  break;
                case "update:blog":
                  userRole.blogs_update_permission = true;
                  break;
                case "list:blog":
                  userRole.blogs_list_permission = true;
                  break;
                case "create:webpages":
                  userRole.webpages_create_permission = true;
                  break;
                case "update:webpages":
                  userRole.webpages_update_permission = true;
                  break;
                case "list:webpages":
                  userRole.webpages_list_permission = true;
                  break;
              }
            }
            this.userRolesList.push(userRole);
          }



          // // Is this line required? Where should it be placed?
          // this.storage.set(STORAGE_KEY_CURRENT_WEBSITE_NAME, websitename);

          // Store the current productCategory name in the local store
          console.log(this.userRolesList);

          resolve(this.userRolesList);
    })
  });

  return promise;

}

}
