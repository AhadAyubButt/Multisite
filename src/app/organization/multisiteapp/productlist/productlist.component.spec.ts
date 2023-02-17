import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProduct } from '../../../Interfaces/product_interface';
import {ProductService} from '../../../Services/product.service';

import { ProductlistComponent } from './productlist.component';

describe('ProductlistComponent', () => {

  let component: ProductlistComponent;
  let fixture: ComponentFixture<ProductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ ProductlistComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProductlistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Test the count of the products in database', async(() => {

    const service = TestBed.get(ProductService);

    const product: IProduct = {
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



    spyOn(service, 'listProducts').and.returnValue(Promise.resolve([product]));

    fixture = TestBed.createComponent(ProductlistComponent);
    component = fixture.componentInstance;
    component.listProducts();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.productsList.length).toBe(1);
      console.log('Expect was called');

    });

  }));


});
