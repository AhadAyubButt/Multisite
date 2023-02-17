import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IHomePage } from '../../../Interfaces/homepage_interface';
import {HomepageService} from '../../../Services/homepage.service';
import { HomepagelistComponent } from './homepagelist.component';

describe('HomepagelistComponent', () => {
  let component: HomepagelistComponent;
  let fixture: ComponentFixture<HomepagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ HomepagelistComponent ]    })
    .compileComponents();
  });

  it('Test the count of the HomePage in database', async(() => {

    let service = TestBed.get(HomepageService);

    let homepage:IHomePage = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
      HomePageName:"",
			HomePageNewUrl:"",
      user_id:"",
      HomePageOldUrl:"",
			HomePageMetaTitle:"",
			HomePageMetaKeywords:"",
			HomePageMetaDescription:"",
			access_token:"",
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

    spyOn(service, 'listHomePages').and.returnValue(Promise.resolve([homepage]))
    fixture = TestBed.createComponent(HomepagelistComponent);
    component = fixture.componentInstance;
    component.listHomePage();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.homepageList.length).toBe(1);
      console.log("Expect was called");

    })

  }))

});
