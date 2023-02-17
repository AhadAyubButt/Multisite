import {Component, HostListener, OnInit} from '@angular/core';
import {IProduct} from '../../../Interfaces/product_interface';
import {Router} from '@angular/router';
import {ProductService} from '../../../Services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageService} from '../../../Services/image.service';
import {WebsiteService} from '../../../Services/website.service';
import {IProductCategory} from "../../../Interfaces/product_category_interface";
import {ProductcategoryService} from "../../../Services/productcategory.service";
import {UPDATE_PRODUCT} from 'src/assets/error.contants';
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  websiteName: string;
  product!: IProduct;
  form = new FormGroup({
    productNewURL: new FormControl(''),
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
  categories: IProductCategory[] = [];
  staticfiles: any;
  data: IProduct[] = [];
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
  // dtOptions: DataTables.Settings = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  //   lengthMenu: [5, 10, 25],
  //   processing: true,
  //   searching: true
  // };
  relatedProducts: Array<string> = [];
  imageURLArray: Array<string> = [];
  files: File[] = [];
  imageFilesVar: { file: string; name: string }[] = [];
  newImgLinks: string[] = [];
  proceed: Observable<boolean> | boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private imageService: ImageService,
    private websiteService: WebsiteService,
    private productCategoryService: ProductcategoryService
  ) {
    this.websiteName = this.websiteService.getCurrentWebsiteName();
    this.product = {
      DelFlag: "",
      OrganiztionId: '',
      ProductAltText1: '',
      ProductAltText2: '',
      ProductAltText3: '',
      ProductAltText4: '',
      ProductAltText5: '',
      ProductCategory: '',
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
      ProductSchema: '',
      ProductShortDescription: '',
      WebSiteName: '',
      id: ''
    };
    this.imageService.getImagefromS3().then((value) => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);
    });
    const location = this.router.getCurrentNavigation();
    if (location !== null) {
      const state = location.extras.state as {
        id: string;
      };
      this.product.id = state.id;
    }
  }

  ngOnInit(): void {
    this.readProduct(this.product.id);
    this.productService
      .listProducts(this.websiteName, '', '')
      .then((productList: IProduct[]) => {
        this.data = productList.filter(value => value.DelFlag == '1');
      });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.proceed;
  }

  readProduct(id: string): void {
    this.files = [];
    this.productService.readProduct(id).then((value: any) => {
      if (value.status === 'read:product') {
        this.product = value.Item.Item;
        console.log(value);
        this.form.patchValue({
          productNewURL: this.product.ProductNewURL,
          productname: this.product.ProductName,
          productschema: this.product.ProductSchema,
          productshortdesc: this.product.ProductShortDescription,
          productdetaildesc: this.product.ProductDetailedDescription,
          productAltText1: this.product.ProductAltText1,
          productAltText2: this.product.ProductAltText2,
          productAltText3: this.product.ProductAltText3,
          productAltText4: this.product.ProductAltText4,
          productAltText5: this.product.ProductAltText5,
          product_meta_title: this.product.ProductMetaDataTitle,
          product_meta_keyword: this.product.ProductMetaDataKeywords,
          product_meta_description: this.product.ProductMetaDataDescription,
          categoryName: this.product.ProductCategory,
          html: ''
        });
        this.productCategoryService
          .listProductCategories(
            this.websiteName, '', ''
          )
          .then((val) => {
            console.log('categories values are', val);
            this.categories = val;
          });

        for (let i = 0; i < 5; i++) {
          // tslint:disable-next-line:no-string-literal
          // @ts-ignore
          if (
            // @ts-ignore
            this.product[`ProductRelatedProductId${i + 1}`] !== '' &&
            // @ts-ignore
            this.product[`ProductRelatedProductId${i + 1}`] !== undefined
          ) {
            this.relatedProducts.push(
              // @ts-ignore
              this.product[`ProductRelatedProductId${i + 1}`]
            );
          }
        }
        for (let i = 1; i <= 5; i++) {
          if (
            // @ts-ignore
            this.product[`ProductImageURL${i}`] !== '' &&
            // @ts-ignore
            this.product[`ProductImageURL${i}`] !== undefined
          ) {
            // @ts-ignore
            this.getImageFromService(this.product[`ProductImageURL${i}`]);
          }
        }
        console.log(this.relatedProducts);
      }
    });

  }

  isRelatedProduct(group: any): boolean {
    const index = this.relatedProducts.indexOf(group.id);
    if (index > -1) {
      return true;
    }
    return false;
  }

  addRelatedProduct(group: any): void {
    if (this.relatedProducts.length >= 5) {
      alert('You can add only 5 Related Products.');
    } else {
      this.relatedProducts.push(group.id);
    }
  }

  removeRelatedProduct(group: any): void {
    const index = this.relatedProducts.indexOf(group.id);
    this.relatedProducts.splice(index, 1);
  }

  updateProduct(): void {
    this.proceed = confirm("Are you sure you want to proceed?");
    if (this.proceed) {
      this.product.ProductAltText1 = this.form.controls.productAltText1.value;
      this.product.ProductAltText2 = this.form.controls.productAltText2.value;
      this.product.ProductAltText3 = this.form.controls.productAltText3.value;
      this.product.ProductAltText4 = this.form.controls.productAltText4.value;
      this.product.ProductAltText5 = this.form.controls.productAltText5.value;
      this.product.ProductCategory = this.form.controls.categoryName.value;
      this.product.ProductDetailedDescription = this.form.controls.productdetaildesc.value;
      this.product.ProductMetaDataDescription = this.form.controls.product_meta_description.value;
      this.product.ProductMetaDataKeywords = this.form.controls.product_meta_keyword.value;
      this.product.ProductMetaDataTitle = this.form.controls.product_meta_title.value;
      this.product.ProductName = this.form.controls.productname.value;
      this.product.ProductNewURL = this.form.controls.productNewURL.value;
      this.product.ProductSchema = this.form.controls.productschema.value;
      this.product.ProductShortDescription = this.form.controls.productshortdesc.value;
      this.product.WebSiteName = this.websiteName;
      this.product.ProductRelatedProductId1 = '';
      this.product.ProductRelatedProductId2 = '';
      this.product.ProductRelatedProductId3 = '';
      this.product.ProductRelatedProductId3 = '';
      this.product.ProductRelatedProductId5 = '';

      this.relatedProducts.forEach((val, i) => {
        // @ts-ignore
        this.product[`ProductRelatedProductId${i + 1}`] = val;
      })

      // for (let i = 5 - this.relatedProducts.length - 1; i < 5; i++) {
      //   // @ts-ignore
      //   this.product[`ProductRelatedProductId${i + 1}`] = '';
      // }
      for (let i = this.files.length - this.imageFilesVar.length; i < 5; i++) {
        // @ts-ignore
        this.product[`ProductImageURL${i + 1}`] = '';
      }
      this.imageFilesVar.forEach((item, index) => {

        const link = this.productService.createImage(this.websiteName, item.name, item.file?.toString());
        // @ts-ignore
        this.product[`ProductImageURL${this.files.length - this.imageFilesVar.length + index + 1}`] = link;

      });
      console.log(this.product);
      this.productService.updateProduct(this.product).then((value: any) => {
        console.log(value);
        if (value?.status === UPDATE_PRODUCT) {
          this.router.navigate(['multisite', 'listProducts']).then(val => console.log(val));
        }
      });
    }
  }

  changeCategory($event: Event): void {
  }

  onSelect(file: { addedFiles: any }): void {
    console.log(file);
    if (this.files.length + file.addedFiles.length <= 5) {
      for (const item of file.addedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(item);

        reader.onload = () => {
          if (reader.result !== null) {
            this.imageFilesVar.push({file: reader.result.toString(), name: item.name});
          }
        };
      }

      this.files.push(...file.addedFiles);
      console.log(this.files, this.imageFilesVar);
    } else {
      alert('Can\'t add more than 5 images');
    }
  }

  onRemove(file: File): void {
    console.log(file);
    this.files.splice(this.files.indexOf(file), 1);
    this.imageFilesVar.findIndex((value, index) => {
      console.log(value.name);
      console.log(file.name);
      return value.name === file.name ? this.imageFilesVar.splice(index, 1) : console.log('Index not found');
    });
    console.log(this.imageFilesVar);
  }

  getImageFromService(imageURL: string): void {
    const imgname = imageURL.replace(
      '',
      ''
    );
    const type = imgname.split('.')[1];
    this.imageService.getImage(imageURL).subscribe((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        console.log('heloo', this.imageFilesVar);
        this.files.push(new File([blob], imgname, {type: 'image/' + type}));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
