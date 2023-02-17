
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAllProducts } from '../../../Interfaces/allproducts_interface';
import {AllproductsService} from '../../../Services/allproducts.service';
import { UpdateallproductsComponent } from './updateallproducts.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UpdateallproductsComponent', () => {

  let component: UpdateallproductsComponent;

  let fixture: ComponentFixture<UpdateallproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdateallproductsComponent ]
    })
    .compileComponents();
  });

  it('Verify that allproducts is updated with specified values', () => {

    fixture = TestBed.createComponent(UpdateallproductsComponent);
    component = fixture.componentInstance;

    component.allproducts.id = "id";
    component.allproducts.OrganiztionId = "OrganizationId";
    component.allproducts.WebsiteName = "WebsiteName";
    component.allproducts.AllProductsNewUrl = "AllProductsNewUrl";
    component.allproducts.AllProductsOldUrl = "AllProductsOldUrl";
    component.allproducts.AllProductsPageName = "AllProductsPageName";
    component.allproducts.AllProductsMetaTitle = "AllProductsMetaTitle";
    component.allproducts.AllProductsMetaKeywords = "AllProductsMetaKeywords";
    component.allproducts.AllProductsMetaDescription = "AllProductsMetaDescription";

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
    };

		allproducts.id = "id";
		allproducts.OrganiztionId = "OrganizationId";
		allproducts.WebsiteName = "WebsiteName";
		allproducts.AllProductsNewUrl = "AllProductsNewUrl";
		allproducts.AllProductsOldUrl = "AllProductsOldUrl";
		allproducts.AllProductsPageName = "AllProductsPageName";
		allproducts.AllProductsMetaTitle = "AllProductsMetaTitle";
		allproducts.AllProductsMetaKeywords = "AllProductsMetaKeywords";
		allproducts.AllProductsMetaDescription = "AllProductsMetaDescription";

    spyOn(service, 'updateAllProducts').withArgs(allproducts).and.returnValue(Promise.resolve("True"))

    fixture.detectChanges();

    var result = component.updateAllProducts();
    result.then((val) => {
      expect(val).toEqual("True")
    })
  })
});
