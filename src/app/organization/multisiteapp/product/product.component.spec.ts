import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from 'ngx-webstorage-service';
import { HttpService } from '../../../Services/http.service';
import { IProduct } from '../../../Interfaces/product_interface';
import {ProductService} from '../../../Services/product.service';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  });

  it('Verify that product is created with specified values', () => {

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";

    let httpService:HttpService;
    let storageService:StorageService;

    let service = TestBed.get(ProductService);

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



    spyOn(service, 'createProduct').withArgs(product).and.returnValue(Promise.resolve("True"));



    fixture.detectChanges();

    var result = component.createProduct();
    result.then((val) => {
      expect(val).toEqual("True")
    })

  })


});
