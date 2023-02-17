
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAllProducts } from '../../../Interfaces/allproducts_interface';
import {AllproductsService} from '../../../Services/allproducts.service';
import { AllproductslistComponent } from './allproductslist.component';

describe('AllProductslistComponent', () => {
  let component: AllproductslistComponent;
  let fixture: ComponentFixture<AllproductslistComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ AllproductslistComponent ]    })
    .compileComponents();
  });

  it('Test the count of the AllProducts in database', async(() => {

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
		allproducts.OrganiztionId = "organizationid";
		allproducts.WebsiteName = "websitename";
		allproducts.AllProductsNewUrl = "allproductsnewurl";
		allproducts.AllProductsOldUrl = "allproductsoldurl";
		allproducts.AllProductsPageName = "allproductspagename";
		allproducts.AllProductsMetaTitle = "allproductsmetatitle";
		allproducts.AllProductsMetaKeywords = "allproductsmetakeywords";
		allproducts.AllProductsMetaDescription = "allproductsmetadescription";
		allproducts.access_token = "access_token";

    spyOn(service, 'listAllProductss').and.returnValue(Promise.resolve([allproducts]))
    fixture = TestBed.createComponent(AllproductslistComponent);
    component = fixture.componentInstance;
    component.listAllProducts();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.allproductsList.length).toBe(1);
      console.log("Expect was called");

    })

  }))

});

