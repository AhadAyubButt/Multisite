import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAllBlogs } from '../../../Interfaces/allblogs_interface';
import {AllblogsService} from '../../../Services/allblogs.service';
import { UpdateallblogsComponent } from './updateallblogs.component';

describe('UpdateallblogsComponent', () => {

  let component: UpdateallblogsComponent;

  let fixture: ComponentFixture<UpdateallblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdateallblogsComponent ]
    })
    .compileComponents();
  });

  it('Verify that allblogs is updated with specified values', () => {

    fixture = TestBed.createComponent(UpdateallblogsComponent);
    component = fixture.componentInstance;

    component.allblogs.id = "id";
    component.allblogs.OrganiztionId = "OrganizationId";
    component.allblogs.WebsiteName = "WebsiteName";
    component.allblogs.AllBlogsNewUrl = "AllBlogsNewUrl";
    component.allblogs.AllBlogsOldUrl = "AllBlogsOldUrl";
    component.allblogs.AllBlogsPageName = "AllBlogsPageName";
    component.allblogs.AllBlogsMetaTitle = "AllBlogsMetaTitle";
    component.allblogs.AllBlogsMetaKeywords = "AllBlogsMetaKeywords";
    component.allblogs.AllBlogsMetaDescription = "AllBlogsMetaDescription";
    component.allblogs.access_token = "access_token";

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
		allblogs.OrganiztionId = "OrganizationId";
		allblogs.WebsiteName = "WebsiteName";
		allblogs.AllBlogsNewUrl = "AllBlogsNewUrl";
		allblogs.AllBlogsOldUrl = "AllBlogsOldUrl";
		allblogs.AllBlogsPageName = "AllBlogsPageName";
		allblogs.AllBlogsMetaTitle = "AllBlogsMetaTitle";
		allblogs.AllBlogsMetaKeywords = "AllBlogsMetaKeywords";
		allblogs.AllBlogsMetaDescription = "AllBlogsMetaDescription";
		allblogs.access_token = "access_token";

    spyOn(service, 'updateAllBlogs').withArgs(allblogs).and.returnValue(Promise.resolve("True"))

    fixture.detectChanges();

    var result = component.updateAllBlogs();
    result.then((val) => {
      expect(val).toEqual("True")
    })
  })
});
