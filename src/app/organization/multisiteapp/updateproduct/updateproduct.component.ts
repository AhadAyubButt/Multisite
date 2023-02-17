/* tslint:disable:variable-name */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { WebsiteService } from '../../../Services/website.service';
import { Editor, Toolbar } from 'ngx-editor';
import { ProductcategoryService } from '../../../Services/productcategory.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../../Services/image.service';
import { IProduct } from '../../../Interfaces/product_interface';
import { UPDATE_PRODUCT } from 'src/assets/error.contants';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
  providers: [ImageService]
})
export class UpdateproductComponent implements OnInit {
  static productService: ProductService;
  static websiteName: string;
  static imageURLArray: Array<string>;
  static relatedProducts: Array<string>;
  static productsList: Array<any> = [];

  // dropzone ts code begin
  static files: File[] = [];
  productObject: IProduct;
  editor: Editor;
  dropzone: NgxDropzoneModule;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  html = '';
  imgUrl = 'https://picsum.photos/200/300/?random';
  imagesToShow: any = [];
  isImageLoading: boolean;
  myURL: any;
  categories: any;
  public data: any = [];
  dtOptions: any = {};
  http: any;
  access_token: string;
  options = {
    toolbarSticky: true,
    toolbarStickyOffset: 100,
    imageUploadToS3: {
      uploadURL: ''
    },
    videoUploadToS3: {
      uploadURL: ''
    }
  };

  form = new FormGroup({
    productNewUrl: new FormControl(''),
    productOldUrl: new FormControl(''),

    productname: new FormControl(''),

    productschema: new FormControl(''),

    productshortdesc: new FormControl(''),
    productdetaildesc: new FormControl(''),

    product_meta_title: new FormControl(''),

    product_meta_keyword: new FormControl(''),
    product_meta_description: new FormControl(''),

    productAltText1: new FormControl(''),
    productAltText2: new FormControl(''),
    productAltText3: new FormControl(''),
    productAltText4: new FormControl(''),
    productAltText5: new FormControl(''),

    categoryName: new FormControl(''),
    html: new FormControl('')
  });

  get staticfiles(): File[] {
    return UpdateproductComponent.files;
  }

  constructor(
    private imageService: ImageService,
    private prodService: ProductService,
    private websiteService: WebsiteService,
    private productCategoryService: ProductcategoryService,
    private router: Router
  ) {
    console.log('in constructor method of update product');

    UpdateproductComponent.imageURLArray = [];
    UpdateproductComponent.relatedProducts = [];

    UpdateproductComponent.productService = prodService;
    UpdateproductComponent.websiteName = websiteService.getCurrentWebsiteName();

    console.log(
      'In product current website name is ' + UpdateproductComponent.websiteName
    );
    this.editor = new Editor();
    this.dropzone = new NgxDropzoneModule();
    this.html = '';
    this.isImageLoading = false;
    this.access_token = '';
    this.imageService.getImagefromS3().then((value) => {
      Object.assign(this.options.imageUploadToS3, value.body.Item);
      Object.assign(this.options.videoUploadToS3, value.body.Item);

    });
    this.productObject = {
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
      ProductShortDescription: '',
      WebSiteName: '',
      id: '',
      ProductSchema: ''
    };

    const navigation: any = this.router.getCurrentNavigation();

    if (null != navigation) {
      const state = navigation.extras.state as {
        product: any;
      };
      console.log(state.product);
      this.productObject = state.product;
    }
  }

  ngOnInit(): void {
    console.log('in ngoninit method of update product');
    UpdateproductComponent.files = [];

    // let currentProductName = UpdateproductComponent.productService.getCurrentProductName();
    // this.productObject = UpdateproductComponent.productService.getProductByName(currentProductName);

    this.form.controls.productNewUrl.setValue(this.productObject.ProductNewURL);
    this.form.controls.productOldUrl.setValue(this.productObject.ProductOldURL);

    this.form.controls.productname.setValue(this.productObject.ProductName);
    this.form.controls.productschema.setValue(this.productObject.ProductSchema);
    this.form.controls.categoryName.setValue(
      this.productObject.ProductCategory,
      { onlySelf: true }
    );


    this.form.controls.productdetaildesc.setValue(
      this.productObject.ProductDetailedDescription
    );
    this.form.controls.productshortdesc.setValue(
      this.productObject.ProductShortDescription
    );

    this.form.controls.product_meta_description.setValue(
      this.productObject.ProductMetaDataDescription
    );
    this.form.controls.product_meta_title.setValue(
      this.productObject.ProductMetaDataTitle
    );
    this.form.controls.product_meta_keyword.setValue(
      this.productObject.ProductMetaDataKeywords
    );
    this.form.controls.productAltText1.setValue(
      this.productObject.ProductAltText1
    );
    this.form.controls.productAltText2.setValue(
      this.productObject.ProductAltText2
    );
    this.form.controls.productAltText3.setValue(
      this.productObject.ProductAltText3
    );
    this.form.controls.productAltText4.setValue(
      this.productObject.ProductAltText4
    );
    this.form.controls.productAltText5.setValue(
      this.productObject.ProductAltText5
    );
    if (this.productObject.ProductRelatedProductId1 !== undefined) {
      UpdateproductComponent.relatedProducts.push(
        this.productObject.ProductRelatedProductId1
      );
    }
    if (this.productObject.ProductRelatedProductId2 !== undefined) {
      UpdateproductComponent.relatedProducts.push(
        this.productObject.ProductRelatedProductId2
      );
    }
    if (this.productObject.ProductRelatedProductId3 !== undefined) {
      UpdateproductComponent.relatedProducts.push(
        this.productObject.ProductRelatedProductId3
      );
    }
    if (this.productObject.ProductRelatedProductId4 !== undefined) {
      UpdateproductComponent.relatedProducts.push(
        this.productObject.ProductRelatedProductId4
      );
    }
    if (this.productObject.ProductRelatedProductId5 !== undefined) {
      UpdateproductComponent.relatedProducts.push(
        this.productObject.ProductRelatedProductId5
      );
    }

    if (
      this.productObject.ProductImageURL1 !== undefined &&
      this.productObject.ProductImageURL1 !== ''
    ) {
      UpdateproductComponent.imageURLArray.push(
        this.productObject.ProductImageURL1
      );
    }
    if (
      this.productObject.ProductImageURL2 !== undefined &&
      this.productObject.ProductImageURL2 !== ''
    ) {
      UpdateproductComponent.imageURLArray.push(
        this.productObject.ProductImageURL2
      );
    }
    if (
      this.productObject.ProductImageURL3 !== undefined &&
      this.productObject.ProductImageURL3 !== ''
    ) {
      UpdateproductComponent.imageURLArray.push(
        this.productObject.ProductImageURL3
      );
    }
    if (
      this.productObject.ProductImageURL4 !== undefined &&
      this.productObject.ProductImageURL4 !== ''
    ) {
      UpdateproductComponent.imageURLArray.push(
        this.productObject.ProductImageURL4
      );
    }
    if (
      this.productObject.ProductImageURL5 !== undefined &&
      this.productObject.ProductImageURL5 !== ''
    ) {
      UpdateproductComponent.imageURLArray.push(
        this.productObject.ProductImageURL5
      );
    }

    UpdateproductComponent.imageURLArray.forEach(item => {
      this.getImageFromService(item);
    });

    this.access_token = '';

    const user_id = '';

    UpdateproductComponent.productService
      .listProducts(
        UpdateproductComponent.websiteName,
        this.access_token,
        user_id
      )
      .then((productList) => {
        UpdateproductComponent.productsList = [];
        UpdateproductComponent.productsList = productList; // UpdateproductComponent.productService.getProductsList();
        for (const item of UpdateproductComponent.productsList) {
          const productObj = {
            image: item.ProductImageURL1,
            name: item.ProductName,
            add: '',
            productId: item.id
          };
          this.data.push(productObj);
        }
      });

    this.productCategoryService
      .listProductCategories(
        UpdateproductComponent.websiteName,
        this.access_token,
        user_id
      )
      .then(() => {
        this.categories = this.productCategoryService.getProductsCategoryList();
      });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
  }

  changeCategory(e: any): void {
    console.log(e.value);
    this.form.controls.categoryName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  getImageFromService(imageURL: string): void {

    const name = imageURL.replace(
      '',
      ''
    );
    const type = name.split('.')[1];
    this.imageService.getImage(imageURL).subscribe(
      (blob) => {
        UpdateproductComponent.files.push(
          new File([blob], name, { type: 'image/' + type })
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addRelatedProduct(group: any): void {
    let relatedProductAdded = false;
    for (let i = 0; i < UpdateproductComponent.relatedProducts.length; i++) {
      if (UpdateproductComponent.relatedProducts[i] === '') {
        UpdateproductComponent.relatedProducts[i] = group.productId;
        relatedProductAdded = true;
        break;
      }
    }

    if (!relatedProductAdded) {
      alert('You can add only 5 Related Products.');
    }
  }

  removeRelatedProduct(group: any): void {
    const index = UpdateproductComponent.relatedProducts.indexOf(
      group.productId
    );
    UpdateproductComponent.relatedProducts[index] = '';

    for (
      let i = index + 1;
      i < UpdateproductComponent.relatedProducts.length;
      i++
    ) {
      UpdateproductComponent.relatedProducts[i - 1] =
        UpdateproductComponent.relatedProducts[i];
      UpdateproductComponent.relatedProducts[i] = '';
    }
  }

  isRelatedProduct(group: any): boolean {
    const index = UpdateproductComponent.relatedProducts.indexOf(
      group.productId
    );
    if (index > -1) {
      return true;
    }
    return false;
  }

  updateProduct(): Promise<any> {
    console.log('update product method called');
    UpdateproductComponent.websiteName = this.websiteService.getCurrentWebsiteName();
    const formCategoryName: string = this.form.controls.categoryName.value;

    // Find proper mechanism to get value from dropdown
    const index = formCategoryName.indexOf(':');
    let categoryName = '';
    if (index > 0) {
      categoryName = formCategoryName.substring(
        3,
        this.form.controls.categoryName.value.length
      );
    } else {
      categoryName = formCategoryName;
    }

    const product: IProduct = {
      DelFlag: "",
      OrganiztionId: '',
      ProductAltText1: '',
      ProductAltText2: '',
      ProductAltText3: '',
      ProductAltText4: '',
      ProductAltText5: '',
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

    product.WebSiteName = UpdateproductComponent.websiteName;

    product.ProductNewURL = this.form.controls.productNewUrl.value;
    product.ProductOldURL = this.form.controls.productOldUrl.value;

    product.ProductName = this.form.controls.productname.value;

    product.ProductSchema = this.form.controls.productschema.value;
    product.ProductCategory = categoryName;

    product.ProductShortDescription = this.form.controls.productshortdesc.value;
    product.ProductDetailedDescription = this.form.controls.productdetaildesc.value;
    product.ProductMetaDataTitle = this.form.controls.product_meta_title.value;
    product.ProductMetaDataKeywords = this.form.controls.product_meta_keyword.value;
    product.ProductMetaDataDescription = this.form.controls.product_meta_description.value;

    product.id = this.productObject.id;

    product.ProductImageURL1 = UpdateproductComponent.imageURLArray[0];
    product.ProductImageURL2 = UpdateproductComponent.imageURLArray[1];
    product.ProductImageURL3 = UpdateproductComponent.imageURLArray[2];
    product.ProductImageURL4 = UpdateproductComponent.imageURLArray[3];
    product.ProductImageURL5 = UpdateproductComponent.imageURLArray[4];

    product.ProductRelatedProductId1 =
      UpdateproductComponent.relatedProducts[0];
    product.ProductRelatedProductId2 =
      UpdateproductComponent.relatedProducts[1];
    product.ProductRelatedProductId3 =
      UpdateproductComponent.relatedProducts[2];
    product.ProductRelatedProductId4 =
      UpdateproductComponent.relatedProducts[3];
    product.ProductRelatedProductId5 =
      UpdateproductComponent.relatedProducts[4];
    product.ProductAltText1 = this.form.controls.productAltText1.value;
    product.ProductAltText2 = this.form.controls.productAltText2.value;
    product.ProductAltText3 = this.form.controls.productAltText3.value;
    product.ProductAltText4 = this.form.controls.productAltText4.value;
    product.ProductAltText5 = this.form.controls.productAltText5.value;

    return new Promise<any>((resolve, reject) => {


      UpdateproductComponent.productService
        .updateProduct(product)
        .then((val: any) => {
          if (val.status === UPDATE_PRODUCT) {
            console.log('POST call successful value returned in body', val);
            this.router.navigate(['multisite', 'listProducts']);

            // OQ : why is this resolve method used here
            resolve(val);
          } else {
            alert('You are not authorized to perform this operation');

            // OQ : why is this reject method used here
            reject(val);
          }
        });
    });

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
            const imageURL = UpdateproductComponent.productService.createImage(
              UpdateproductComponent.websiteName,
              fileName,
              img.currentSrc
            );
            UpdateproductComponent.imageURLArray.push(imageURL);
          };

          // set the data url as src
          img.src = reader.result as string;
        },
        false
      );
      // read the file as a data url (compatible with img.src)
      reader.readAsDataURL(item);
    }

    if (UpdateproductComponent.files.length >= 5) {
      alert('You can only add 5 images');
      return;
    } else {
      UpdateproductComponent.files.push(...any.addedFiles);
    }
  }

  onRemove(file: File): void {
    console.log(file);

    const imageIndex = UpdateproductComponent.files.indexOf(file);
    UpdateproductComponent.imageURLArray.splice(imageIndex, 1);
    UpdateproductComponent.files.splice(imageIndex, 1);

    // Find the empty elements in the image URL array and remove them
    for (let i = 0; i < UpdateproductComponent.imageURLArray.length; i++) {
      if (UpdateproductComponent.imageURLArray[i] === '') {
        UpdateproductComponent.imageURLArray.splice(i, 1);
      }
    }
  }
}
