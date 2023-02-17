
import { Component, Inject, OnInit } from '@angular/core';
import {AllproductsService} from '../../../Services/allproducts.service';
import { NavigationExtras, Router } from '@angular/router';
import {WebsiteService} from '../../../Services/website.service';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {IAllProducts} from "../../../Interfaces/allproducts_interface";


@Component({
  selector: 'app-allproductslist',
  templateUrl: './allproductslist.component.html',
  styleUrls: ['./allproductslist.component.css']
})

export class AllproductslistComponent implements OnInit {

  constructor(AllProductsService: AllproductsService, websiteService: WebsiteService, _router: Router,
        @Inject(LOCAL_STORAGE) private storage: StorageService) {

    this.AllProductsService = AllProductsService;
    this.router = _router;
    this.websiteService = websiteService;


    this.access_token = '';


  }

	AllProductsService:AllproductsService;
	allproductsList: IAllProducts[] = [];
  router: Router;
  websiteService:WebsiteService;
  access_token:string;



  ngOnInit(): void {
    console.log("AllProducts list");
    this.listAllProducts();
  }

  updateAllProducts(allproductsId:string) {

    let websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    let user_id:string = '';

    this.AllProductsService.listAllProducts(websitename, this.access_token, user_id).then(() => {

      let allproductsInList = this.AllProductsService.getallproductsById(allproductsId);
      const navigationExtras: NavigationExtras = {
        state: {
					allproducts:allproductsInList
        }
      };

      this.router.navigate(['multisite','updateAllProducts'], navigationExtras);

    });

  }

  listAllProducts() {

    let websiteName:string;
    websiteName = this.websiteService.getCurrentWebsiteName()

this.access_token = '';

      let user_id:string = '';

      // TODO : method parameter should be empty. All information to be passed through interface objects.
      this.AllProductsService.listAllProducts(websiteName, this.access_token, user_id).then((allproductsList) => {
        this.allproductsList = [];
        this.allproductsList = allproductsList;
      });

  }

}
