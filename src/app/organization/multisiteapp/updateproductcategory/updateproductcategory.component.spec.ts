import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProductCategory } from '../../../Interfaces/product_category_interface';
import {ProductcategoryService} from '../../../Services/productcategory.service';

import { UpdateproductcategoryComponent } from './updateproductcategory.component';

describe('UpdateproductcategoryComponent', () => {
  let component: UpdateproductcategoryComponent;
  let fixture: ComponentFixture<UpdateproductcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateproductcategoryComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UpdateproductcategoryComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdateproductcategoryComponent ]
    })
    .compileComponents();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verify that product category is updated with proper values', () => {

    fixture = TestBed.createComponent(UpdateproductcategoryComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";
    component.productcategory.id = "10";

    component.productcategory.WebSiteName = "WebSiteName";
    component.productcategory.PCParentCategoryId = "PCParentCategoryId";
    component.productcategory.PCNewURL = "PCNewURL";
    component.productcategory.PCName = "PCName";
    component.productcategory.PCDescription = "PCDescription"
    component.productcategory.PCMetaDataTitle = "PCMetaDataTitle";
    component.productcategory.PCMetaDataKeywords = "PCMetaDataKeywords";
    component.productcategory.PCMetaDataDescription = "PCMetaDataDescription";

    let service = TestBed.get(ProductcategoryService);

    let productCategory:IProductCategory = {
      id:"",
      PCName:"",
      PCMetaDataDescription: "",
      PCParentCategoryId : "",
      PCDescription : "",
      PCNewURL: "",
      OrganiztionId: "",
      PCMetaDataTitle: "",
      WebSiteName: "",
      PCMetaDataKeywords: "",
      PCOldURL: "",
      access_token:"",
      user_id:""
    }

    productCategory.WebSiteName = "WebSiteName";
    productCategory.id = "10";
    productCategory.PCNewURL = 'PCNewURL';
    productCategory.PCName = 'PCName';
    productCategory.PCDescription = 'PCDescription';

    productCategory.PCMetaDataTitle = 'PCMetaDataTitle';
    productCategory.PCMetaDataKeywords = 'PCMetaDataKeywords';
    productCategory.PCMetaDataDescription = 'PCMetaDataDescription';

    spyOn(service, 'updateProductCategory').withArgs(productCategory).and.returnValue(Promise.resolve("True"))

    fixture.detectChanges();

    var result = component.updateProductCategory();
    result.then((val) => {
      expect(val).toEqual("True")
    })

  })


});
