
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageService } from 'ngx-webstorage-service';
import { HttpService } from '../../../Services/http.service';
import {AllproductsService} from '../../../Services/allproducts.service';
import { AllproductsComponent } from './allproducts.component';
import { IAllProducts } from '../../../Interfaces/allproducts_interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AllProductsComponent', () => {
  let component: AllproductsComponent;
  let fixture: ComponentFixture<AllproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ AllproductsComponent ]
    })
    .compileComponents();
  });

  it('Verify that iallproducts is created with specified values', () => {
    fixture = TestBed.createComponent(AllproductsComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";

    let httpService:HttpService;
    let storageService:StorageService;

    let service = TestBed.get(AllproductsService);

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
			access_token:"",
      user_id:""
    };

		allproducts.id = "id";
		allproducts.WebsiteName = "websitename";
		allproducts.AllProductsNewUrl = "allproductsnewurl";
		allproducts.AllProductsOldUrl = "allproductsoldurl";
		allproducts.AllProductsPageName = "allproductspagename";
		allproducts.AllProductsMetaTitle = "allproductsmetatitle";
		allproducts.AllProductsMetaKeywords = "allproductsmetakeywords";
		allproducts.AllProductsMetaDescription = "allproductsmetadescription";
		allproducts.access_token = "access_token";

    spyOn(service, 'createAllProducts').withArgs(allproducts).and.returnValue(Promise.resolve("True"))

    component.form.controls['id'].setValue("id")
    component.form.controls['OrganizationId'].setValue("OrganizationId")
    component.form.controls['WebsiteName'].setValue("WebsiteName")
    component.form.controls['AllProductsNewUrl'].setValue("AllProductsNewUrl")
    component.form.controls['AllProductsOldUrl'].setValue("AllProductsOldUrl")
    component.form.controls['AllProductsPageName'].setValue("AllProductsPageName")
    component.form.controls['AllProductsMetaTitle'].setValue("AllProductsMetaTitle")
    component.form.controls['AllProductsMetaKeywords'].setValue("AllProductsMetaKeywords")
    component.form.controls['AllProductsMetaDescription'].setValue("AllProductsMetaDescription")
    component.form.controls['access_token'].setValue("access_token")

    fixture.detectChanges();

    var result = component.createAllProducts();

    result.then((val) => {
      expect(val).toEqual("True")
    })

  })

});
