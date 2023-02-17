import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAllBlogs } from '../../../Interfaces/allblogs_interface';
import {AllblogsService} from '../../../Services/allblogs.service';
import { AllblogslistComponent } from './allblogslist.component';

describe('AllBlogslistComponent', () => {

  let component: AllblogslistComponent;
  let fixture: ComponentFixture<AllblogslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ AllblogslistComponent ]    })
    .compileComponents();
  });

  it('Test the count of the AllBlogs in database', async(() => {

    let service = TestBed.get(AllblogsService);

    let allblogs:IAllBlogs = {
			id:"",
			OrganiztionId:"",
			WebsiteName:"",
			AllBlogsNewUrl:"",
			AllBlogsOldUrl:"",
			AllBlogsPageName:"",
			AllBlogsMetaTitle:"",
			AllBlogsMetaKeywords:"",
			AllBlogsMetaDescription:"",
			access_token:"",
      user_id:""
    };

		allblogs.id = "id";
		allblogs.OrganiztionId = "organizationid";
		allblogs.WebsiteName = "websitename";
		allblogs.AllBlogsNewUrl = "allblogsnewurl";
		allblogs.AllBlogsOldUrl = "allblogsoldurl";
		allblogs.AllBlogsPageName = "allblogspagename";
		allblogs.AllBlogsMetaTitle = "allblogsmetatitle";
		allblogs.AllBlogsMetaKeywords = "allblogsmetakeywords";
		allblogs.AllBlogsMetaDescription = "allblogsmetadescription";
		allblogs.access_token = "access_token";

    spyOn(service, 'listAllBlogss').and.returnValue(Promise.resolve([allblogs]))
    fixture = TestBed.createComponent(AllblogslistComponent);
    component = fixture.componentInstance;
    component.listAllBlogs();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.allblogsList.length).toBe(1);
      console.log("Expect was called");

    })

  }))

});

