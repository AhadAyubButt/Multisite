/* tslint:disable:variable-name */
import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../../Services/product.service';
import {WebsiteService} from '../../../Services/website.service';
import {Router} from '@angular/router';
import {Editor, Toolbar} from 'ngx-editor';
import {ProductcategoryService} from '../../../Services/productcategory.service';

import {IProduct} from '../../../Interfaces/product_interface';
import {CREATE_PRODUCT} from 'src/assets/error.contants';

import {ImageService} from '../../../Services/image.service';
import {IProductCategory} from '../../../Interfaces/product_category_interface';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-product',
  host: {'window:beforeunload': 'doSomething'},
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  websiteName: string;
  proceed: boolean = false;
  imageURLArray: Array<string>;
  relatedProducts: Array<string> = [];
  options = {
    placeholderText: 'Enter Long Description',
    toolbarSticky: true,
    toolbarStickyOffset: 50,
    imageUploadToS3: {
      uploadURL: ''
    },
    videoUploadToS3: {
      uploadURL: ''
    }
  };
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  html = '';
  categories: IProductCategory[] = [];
  access_token: any;
  form = new FormGroup({
    productNewUrl: new FormControl(''),
    productname: new FormControl(''),

    productschema: new FormControl(''),

    productshortdesc: new FormControl(''),

    productdetaildesc: new FormControl(''),

    productAltText1: new FormControl(''),
    productAltText2: new FormControl(''),
    productAltText3: new FormControl(''),
    productAltText4: new FormControl(''),
    productAltText5: new FormControl(''),

    product_meta_title: new FormControl(''),

    product_meta_keyword: new FormControl(''),
    product_meta_description: new FormControl(''),

    categoryName: new FormControl(''),
    html: new FormControl('')
  });
  // dropzone ts code begin
  files: File[] = [];
  // dropzone ts code end
  // data table
  public data: IProduct[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  // dtOptions: DataTables.Settings = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  //   lengthMenu: [5, 10, 25],
  //   processing: true,
  //   searching: true
  // };

  constructor(
    private productService: ProductService,
    private websiteService: WebsiteService,
    private productCategoryService: ProductcategoryService,
    private router: Router,
    private imageService: ImageService
  ) {

    this.imageURLArray = [];

    this.websiteService = websiteService;
    this.productCategoryService = productCategoryService;
    this.websiteName = websiteService.getCurrentWebsiteName();
    console.log(
      'In product current website name is ' + this.websiteName
    );
    this.editor = new Editor();
    this.html = '';
    this.imageService.getImagefromS3().then((value) => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);
    });

    this.access_token = '';
    this.productCategoryService
      .listProductCategories(
        this.websiteName,
        this.access_token,
        ''
      )
      .then((val) => {
        console.log('categories values are', val);
        this.categories = val;
      });
  }

  ngOnInit(): void {
    console.log('ng-init method called for product component');
    // TODO : Is it possible to replicate this pattern to other places. Initializing access_token once in ngOnInit and then re-using it in CRUDL method calls
    this.access_token = '';
    const user_id = '';
    this.productService
      .listProducts(this.websiteName, this.access_token, user_id)
      .then((productList: IProduct[]) => {
        this.data = productList.filter(value => value.DelFlag == '1');
        this.dtTrigger.next(this.data);
      })
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  changeCategory(e: any) {
    console.log(e.value);
    this.form.controls.categoryName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  addRelatedProduct(group: IProduct): void {
    if (this.relatedProducts.length >= 5) {
      alert('You can add only 5 Related Products.');
    } else {
      this.relatedProducts.push(group.id);
    }


  }

  removeRelatedProduct(group: IProduct): void {
    const index = this.relatedProducts.indexOf(group.id);
    this.relatedProducts.splice(index, 1);
  }

  isRelatedProduct(group: IProduct) {
    const index = this.relatedProducts.indexOf(group.id);
    if (index > -1) {
      return true;
    }
    return false;
  }

  createProduct() {
    this.proceed = confirm("Are you sure you want to proceed?");
    if (this.proceed) {

      this.websiteName = this.websiteService.getCurrentWebsiteName();
      const formCategoryName: string = this.form.controls.categoryName.value;

      // Find proper mechanism to get value from dropdown
      const categoryName = formCategoryName.substring(
        3,
        this.form.controls.categoryName.value.length
      );


      const product: IProduct = {
        DelFlag: "",
        OrganiztionId: '',
        ProductAltText1: this.form.controls.productAltText1.value,
        ProductAltText2: this.form.controls.productAltText2.value,
        ProductAltText3: this.form.controls.productAltText3.value,
        ProductAltText4: this.form.controls.productAltText4.value,
        ProductAltText5: this.form.controls.productAltText5.value,
        ProductCategory: '',
        ProductSchema: '',
        ProductDetailedDescription: '',
        ProductImageURL1: '',
        ProductImageURL2: '',
        ProductImageURL3: '',
        ProductImageURL4: '',
        ProductImageURL5: '',
        ProductMetaDataDescription: '',
        ProductMetaDataKeywords: '',
        ProductMetaDataTitle: '',
        ProductName: '',
        ProductNewURL: '',
        ProductOldURL: '',
        ProductRelatedProductId1: '',
        ProductRelatedProductId2: '',
        ProductRelatedProductId3: '',
        ProductRelatedProductId4: '',
        ProductRelatedProductId5: '',
        ProductShortDescription: '',
        WebSiteName: '',
        id: ''
      };
      product.WebSiteName = this.websiteName;
      product.ProductNewURL = this.form.controls.productNewUrl.value;
      product.ProductName = this.form.controls.productname.value;
      product.ProductSchema = this.form.controls.productschema.value;
      product.ProductShortDescription = this.form.controls.productshortdesc.value;
      product.ProductDetailedDescription = this.form.controls.productdetaildesc.value;
      product.ProductMetaDataTitle = this.form.controls.product_meta_title.value;
      product.ProductMetaDataKeywords = this.form.controls.product_meta_keyword.value;
      product.ProductMetaDataDescription = this.form.controls.product_meta_description.value;

      product.ProductCategory = categoryName;

      product.ProductImageURL1 = this.imageURLArray[0];
      product.ProductImageURL2 = this.imageURLArray[1];
      product.ProductImageURL3 = this.imageURLArray[2];
      product.ProductImageURL4 = this.imageURLArray[3];
      product.ProductImageURL5 = this.imageURLArray[4];

      product.ProductRelatedProductId1 = '';
      product.ProductRelatedProductId2 = '';
      product.ProductRelatedProductId3 = '';
      product.ProductRelatedProductId4 = '';
      product.ProductRelatedProductId5 = '';

      this.relatedProducts.forEach((value, index, array) => {
        // @ts-ignore
        product[`ProductRelatedProductId${index + 1}`] = value;

      })

      this.productService
        .createProduct(product)
        .then((val: any) => {
          if (val.status === CREATE_PRODUCT) {
            console.log('POST call successful value returned in body', val);
            this.router.navigate(['multisite', 'listProducts']);

            // OQ : why is this resolve method used here
          } else {
            alert('You are not authorized to perform this operation');

          }
        });
    }
  }

  onSelect(any: { addedFiles: any }): void {
    console.log(any);

    for (const item of any.addedFiles) {
      const formData = new FormData();
      let fileName: string;
      fileName = item.name;
      formData.append('file[]', item);
      const reader = new FileReader();
      // this triggers after readAsDataURL() is called
      reader.addEventListener(
        'load',
        () => {
          // create a new image
          const img = document.createElement('img') as HTMLImageElement;
          // need to wait for it to be loaded to get the natural dimension
          img.onload = () => {
            const imageURL = this.productService.createImage(
              this.websiteName,
              fileName,
              img.currentSrc
            );
            this.imageURLArray.push(imageURL);
          };
          // set the data url as src
          img.src = reader.result as string;
        },
        false
      );
      // read the file as a data url (compatible with img.src)
      reader.readAsDataURL(item);
    }

    this.files.push(...any.addedFiles);
  }

  onRemove(any: File): void {
    console.log(any);
    this.files.splice(this.files.indexOf(any), 1);
  }

  getImageFromS3(): object {
    return this.productService.getImagefromS3();
  }

  ngAfterViewInit() {
    // this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
