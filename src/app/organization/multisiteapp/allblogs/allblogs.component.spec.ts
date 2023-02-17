
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageService } from 'ngx-webstorage-service';
import { HttpService } from '../../../Services/http.service';
import {AllblogsService} from '../../../Services/allblogs.service';
import { AllblogsComponent } from './allblogs.component';
import { IAllBlogs } from '../../../Interfaces/allblogs_interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AllblogsComponent', () => {

  let component: AllblogsComponent;
  let fixture: ComponentFixture<AllblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ AllblogsComponent ]
    })
    .compileComponents();
  });

  it('Verify that iallblogs is created with specified values', () => {
    fixture = TestBed.createComponent(AllblogsComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";

    let httpService:HttpService;
    let storageService:StorageService;

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

    spyOn(service, 'createAllBlogs').withArgs(allblogs).and.returnValue(Promise.resolve("True"))

    component.form.controls['id'].setValue("id")
    component.form.controls['OrganizationId'].setValue("OrganizationId")
    component.form.controls['WebsiteName'].setValue("WebsiteName")
    component.form.controls['AllBlogsNewUrl'].setValue("AllBlogsNewUrl")
    component.form.controls['AllBlogsOldUrl'].setValue("AllBlogsOldUrl")
    component.form.controls['AllBlogsPageName'].setValue("AllBlogsPageName")
    component.form.controls['AllBlogsMetaTitle'].setValue("AllBlogsMetaTitle")
    component.form.controls['AllBlogsMetaKeywords'].setValue("AllBlogsMetaKeywords")
    component.form.controls['AllBlogsMetaDescription'].setValue("AllBlogsMetaDescription")
    component.form.controls['access_token'].setValue("access_token")

    fixture.detectChanges();

    var result = component.createAllBlogs();

    result.then((val) => {
      expect(val).toEqual("True")
    })

  })

});
