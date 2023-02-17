import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategorylistComponent } from './productcategorylist.component';
import {ProductcategoryService} from '../../../Services/productcategory.service';
import { IProductCategory } from '../../../Interfaces/product_category_interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ProductcategorylistComponent', () => {
  let component: ProductcategorylistComponent;
  let fixture: ComponentFixture<ProductcategorylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ ProductcategorylistComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProductcategorylistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Test the count of the product categories in database', async(() => {

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
    productCategory.PCNewURL = 'PCNewURL';
    productCategory.PCName = 'PCName';
    productCategory.PCDescription = 'PCDescription';

    productCategory.PCMetaDataTitle = 'PCMetaDataTitle';
    productCategory.PCMetaDataKeywords = 'PCMetaDataKeywords';
    productCategory.PCMetaDataDescription = 'PCMetaDataDescription';

    spyOn(service, 'getProductsCategoryList').and.returnValue(Promise.resolve([productCategory]))

    fixture = TestBed.createComponent(ProductcategorylistComponent);
    component = fixture.componentInstance;
    component.listProductCategories();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.productCategoryList.length).toBe(1);
      console.log("Expect was called");

    })

  }))

});
