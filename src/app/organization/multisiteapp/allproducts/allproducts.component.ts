
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AllproductsService} from '../../../Services/allproducts.service';
import { WebsiteService } from '../../../Services/website.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { IAllProducts } from '../../../Interfaces/allproducts_interface';


@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})

export class AllproductsComponent implements OnInit {

  AllProductsService:AllproductsService;
  websiteService:WebsiteService;
  router:Router;
  websiteName:string;

  access_token:string;



  constructor(AllProductsService: AllproductsService, websiteService: WebsiteService, _router: Router) {

    this.AllProductsService = AllProductsService;
    this.websiteService = websiteService;
    this.websiteName = this.websiteService.getCurrentWebsiteName();
    this.router = _router;
    console.log("In allproducts current website name is " + this.websiteName);
    this.editor = new Editor();

    this.html='';

    this.access_token = '';


  }

  form = new FormGroup({

		AllProductsNewUrl: new FormControl(''),
		AllProductsOldUrl: new FormControl(''),
		AllProductsPageName: new FormControl(''),
		AllProductsMetaTitle: new FormControl(''),
		AllProductsMetaKeywords: new FormControl(''),
		AllProductsMetaDescription: new FormControl(''),

  });

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html=''

  ngOnInit(): void {
  }

  createAllProducts() {

    console.log("createAllProducts method called");
    this.websiteName = this.websiteService.getCurrentWebsiteName();

    let allproducts:IAllProducts = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
			AllProductsNewUrl:"",
			AllProductsOldUrl:"",
			AllProductsPageName:"",
			AllProductsMetaTitle:"",
			AllProductsMetaKeywords:"",
			AllProductsMetaDescription:"",
    };

		allproducts.WebsiteName = this.websiteName;

    allproducts.AllProductsNewUrl= this.form.controls['AllProductsNewUrl'].value;
    allproducts.AllProductsOldUrl= this.form.controls['AllProductsOldUrl'].value;
    allproducts.AllProductsPageName= this.form.controls['AllProductsPageName'].value;
    allproducts.AllProductsMetaTitle= this.form.controls['AllProductsMetaTitle'].value;
    allproducts.AllProductsMetaKeywords= this.form.controls['AllProductsMetaKeywords'].value;
    allproducts.AllProductsMetaDescription= this.form.controls['AllProductsMetaDescription'].value;

    var promise = new Promise<any>((resolve, reject) => {

    this.access_token = '';


        this.AllProductsService.createAllProducts(allproducts).then((val) => {
          console.log("POST call successful value returned in body",
                      val);
          this.router.navigate(['multisite','listAllProductsPage'])
          resolve(val);

    });
  });

    return promise;

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
