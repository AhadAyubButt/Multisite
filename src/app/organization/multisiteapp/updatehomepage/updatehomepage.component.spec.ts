
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IHomePage } from '../../../Interfaces/homepage_interface';
import {HomepageService} from '../../../Services/homepage.service';
import { UpdatehomepageComponent } from './updatehomepage.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UpdatehomepageComponent', () => {

  let component: UpdatehomepageComponent;

  let fixture: ComponentFixture<UpdatehomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdatehomepageComponent ]
    })
    .compileComponents();
  });

  it('Verify that homepage is updated with specified values', () => {

    fixture = TestBed.createComponent(UpdatehomepageComponent);
    component = fixture.componentInstance;

    component.homepage.id = "id";
    component.homepage.OrganiztionId = "OrganiztionId";
    component.homepage.WebsiteName = "WebsiteName";
    component.homepage.HomePageNewUrl = "HomePageNewUrl";
    component.homepage.HomePageOldUrl = "HomePageOldUrl";
    component.homepage.HomePageMetaTitle = "HomePageMetaTitle";
    component.homepage.HomePageMetaKeywords = "HomePageMetaKeywords";
    component.homepage.HomePageMetaDescription = "HomePageMetaDescription";
    component.homepage.access_token = "access_token";

    let service = TestBed.get(HomepageService);

    let homepage:IHomePage = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
      HomePageName:"",
			HomePageNewUrl:"",
			HomePageOldUrl:"",
			HomePageMetaTitle:"",
      user_id:"",
      HomePageMetaKeywords:"",
			HomePageMetaDescription:"",
			access_token:"",
    };

		homepage.id = "id";
		homepage.OrganiztionId = "OrganiztionId";
		homepage.WebsiteName = "WebsiteName";
		homepage.HomePageNewUrl = "HomePageNewUrl";
		homepage.HomePageOldUrl = "HomePageOldUrl";
		homepage.HomePageMetaTitle = "HomePageMetaTitle";
		homepage.HomePageMetaKeywords = "HomePageMetaKeywords";
		homepage.HomePageMetaDescription = "HomePageMetaDescription";
		homepage.access_token = "access_token";

    spyOn(service, 'updateHomePage').withArgs(homepage).and.returnValue(Promise.resolve("True"))

    fixture.detectChanges();

    var result = component.updateHomePage();
    result.then((val) => {
      expect(val).toEqual("True")
    })
  })
});
