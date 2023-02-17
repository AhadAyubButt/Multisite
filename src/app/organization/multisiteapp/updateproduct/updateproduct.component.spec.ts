import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProduct } from '../../../Interfaces/product_interface';
import { ProductService } from '../../../Services/product.service';
import { UpdateproductComponent } from './updateproduct.component';

describe('UpdateproductComponent', () => {

  let component: UpdateproductComponent;
  let fixture: ComponentFixture<UpdateproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdateproductComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UpdateproductComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verify that product is updated with specified values', () => {

    fixture = TestBed.createComponent(UpdateproductComponent);
    component = fixture.componentInstance;


    let service = TestBed.get(ProductService);

    const product:
      IProduct = {
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



    spyOn(service, 'updateProduct').withArgs(product).and.returnValue(Promise.resolve("True"));

    fixture.detectChanges();

    var result = component.updateProduct();
    result.then((val) => {
      expect(val).toEqual("True")
    })

  })



});
