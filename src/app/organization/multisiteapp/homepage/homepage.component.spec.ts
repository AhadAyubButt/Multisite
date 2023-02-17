
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageService } from 'ngx-webstorage-service';
import { HttpService } from '../../../Services/http.service';
import { HomepageService } from '../../../Services/homepage.service';
import { HomepageComponent } from './homepage.component';
import { IHomePage } from '../../../Interfaces/homepage_interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('HomepageComponent', () => {

  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ HomepageComponent ]
    })
    .compileComponents();
  });

  it('Verify that ihomepage is created with specified values', () => {

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";

    let httpService:HttpService;
    let storageService:StorageService;

    let service = TestBed.get(HomepageService);

    let homepage:IHomePage = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
      HomePageName:"",
			HomePageNewUrl:"",
			HomePageOldUrl:"",
			HomePageMetaTitle:"",
			HomePageMetaKeywords:"",
			HomePageMetaDescription:"",
			access_token:"",
      user_id:""
    };

		homepage.id = "id";
		homepage.OrganiztionId = "organiztionid";
		homepage.WebsiteName = "websitename";
		homepage.HomePageNewUrl = "homepagenewurl";
		homepage.HomePageOldUrl = "homepageoldurl";
		homepage.HomePageMetaTitle = "homepagemetatitle";
		homepage.HomePageMetaKeywords = "homepagemetakeywords";
		homepage.HomePageMetaDescription = "homepagemetadescription";
		homepage.access_token = "access_token";

    spyOn(service, 'createHomePage').withArgs(homepage).and.returnValue(Promise.resolve("True"))

    component.form.controls['HomePageNewUrl'].setValue("HomePageNewUrl")
    component.form.controls['HomePageOldUrl'].setValue("HomePageOldUrl")
    component.form.controls['HomePageMetaTitle'].setValue("HomePageMetaTitle")
    component.form.controls['HomePageMetaKeywords'].setValue("HomePageMetaKeywords")
    component.form.controls['HomePageMetaDescription'].setValue("HomePageMetaDescription")

    fixture.detectChanges();

    var result = component.createHomePage();

    result.then((val) => {
      expect(val).toEqual("True")
    })

  })

});
