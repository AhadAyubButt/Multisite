/* tslint:disable:variable-name */
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { WebsiteService } from '../../../Services/website.service';
import { IProduct } from '../../../Interfaces/product_interface';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { NOT_AUTHORIZED } from 'src/assets/error.contants';

import { Location } from '@angular/common';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  productsList: Array<IProduct> = [];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private websiteService: WebsiteService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    console.log('products list');
    this.productsList = [];
    this.listProducts();
  }

  viewProduct(productName: string): void {
    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    this.productService.listProducts(websitename, '', '').then(() => {
      const productInList = this.productService.getProductByName(productName);
      const navigationExtras: NavigationExtras = {
        state: {
          product: productInList
        }
      };

      this.router.navigate(['multisite', 'viewProduct'], navigationExtras);
    });
  }

  readProduct(idval: string): void {
      const navigationExtras: NavigationExtras = {
        state: {
          id: idval
        }
      };
      this.router.navigate(['multisite', 'viewProduct'], navigationExtras);

  }

  updateProduct(productName: string): void {
    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);
    this.productService.listProducts(websitename, '', '').then((val) => {
      if (val === NOT_AUTHORIZED) {
        alert('User is not authorized to perform this operation');
      } else {
        const productInList = this.productService.getProductByName(productName);
        const navigationExtras: NavigationExtras = {
          state: {
            product: productInList
          }
        };

        this.router.navigate(
          ['multisite', 'updateProduct'],
          navigationExtras
        );
      }
    });
  }

  listProducts() {
    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();
    this.productsList = [];
    this.productService.listProducts(websiteName, '', '').then((value)=> {
      console.log('NEW CODE',value)
      for(const item of value){
        if (item.DelFlag === '1'){
            this.productsList.push(item);
          }
      }
    });
  }

  openDialog(id: string) {
    PopUp.id= id;
    console.log(PopUp.id)
    this.dialog.open(PopUp)
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'pop-up',
  template: `<h1 mat-dialog-title class="main">Delete Product</h1>
  <div mat-dialog-content class="content">Are you sure you want to delete this product?</div>
  <div mat-dialog-actions>
    <button mat-button class="del"(click)='del()'>Delete</button>
    <button mat-button mat-dialog-close (click)='close()'>Close</button>
  </div>`,
  styles: [
    '.main {margin-top:10px; color: white; text-align: center; font-weight: bold}',
    '.content {color: white; margin-bottom: 16px; margin-top: 0px}',
    '.del{background-color: #f44336; color: white; margin:5px}',
    'button{align-items: center}'
  ],
})
export class PopUp{
  static id: string;
  constructor(public dialogRef: MatDialogRef<PopUp>, private prodServ: ProductService, private router: Router, private route: ActivatedRoute) { }

  close(){
    this.dialogRef.close()
  }
  del(){
    console.log(PopUp.id)
    this.prodServ.deleteProduct(PopUp.id).then((value) => {
      if(value.status=="updated"){
        this.close();
        this.router.navigateByUrl('/multisite', { skipLocationChange: true }).then(() => {
          this.router
            .navigate(['/multisite/listProducts'], { relativeTo: this.route,  })
            .then((value1) => {
              console.log('value1 is', value1);
            });
        });
      }
    });

  }
}

