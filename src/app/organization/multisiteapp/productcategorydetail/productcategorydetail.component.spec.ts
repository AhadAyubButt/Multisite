import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Navigation, NavigationExtras, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IProductCategory } from '../../../Interfaces/product_category_interface';

import { ProductcategorydetailComponent } from './productcategorydetail.component';

describe('ProductcategorydetailComponent', () => {

  let component: ProductcategorydetailComponent;
  let fixture: ComponentFixture<ProductcategorydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ ProductcategorydetailComponent ]
    })
    .compileComponents();
    router = TestBed.get(Router)
    route = TestBed.get(ActivatedRoute)

  });

  let router:Router;
  let route:ActivatedRoute;

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProductcategorydetailComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verify that all the values of the product category are shown properly', () => {

    let component: ProductcategorydetailComponent;
    let fixture: ComponentFixture<ProductcategorydetailComponent>;

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

    const spyRoute = spyOn(router, 'getCurrentNavigation')

    const navigationExtras: NavigationExtras = {
      state: {
        product_category:productCategory
      }
    };

    const tree: UrlTree =
      router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');

    let navigation:Navigation =
    {
      id: 1,
      initialUrl: "",
      extractedUrl: tree,
      finalUrl:undefined,
      trigger: 'imperative',
      extras: navigationExtras,
      previousNavigation: null
    };

    spyRoute.and.returnValue(navigation)

    fixture = TestBed.createComponent(ProductcategorydetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    fixture.whenStable().then(() => {

      expect(component.form.controls['productcategoryurl'].value).toBe("productcategoryurl");
      expect(component.form.controls['productcategoryname'].value).toBe("productcategoryname");
      expect(component.form.controls['productcategorydescription'].value).toBe("productcategorydescription");

      expect(component.form.controls['productcategorymetatitle'].value).toBe("productcategorymetatitle");
      expect(component.form.controls['productcategorymetakeyword'].value).toBe("productcategorymetakeyword");
      expect(component.form.controls['productcategorymetadescription'].value).toBe("productcategorymetadescription");

      console.log("Expect was called");

    })

  })


});
