
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageService } from 'ngx-webstorage-service';
import { HttpService } from '../../../Services/http.service';
import {WebpagesService} from '../../../Services/webpages.service';
import { PageComponent } from './page.component';
import { IWebPage } from '../../../Interfaces/webpage_interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ PageComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verify that page is created with specified values', () => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";

    let httpService:HttpService;
    let storageService:StorageService;

    let service = TestBed.get(WebpagesService);

    let webpage:IWebPage = {
      id:"",
      websiteName:"",
      pageNewUrl:"",
      pageOldUrl:"",

      pagename:"",
      pagedescription:"",
      pagemetatitle:"",
      pagemetakeywords:"",
      pagemetadescription:"",
      pagetype:"",
      user_id:""
    };

    webpage.pageNewUrl = 'pageurl';
    webpage.pagename = 'pagename';
    webpage.pagedescription = 'pagedescription';
    webpage.pagemetatitle = 'pagemetatitle';
    webpage.pagemetakeywords = 'pagemetakeywords';
    webpage.pagemetadescription = 'pagemetadescription';

    spyOn(service, 'createWebPage').withArgs(webpage).and.returnValue(Promise.resolve("True"))

    component.form.controls['pageurl'].setValue("pageurl")
    component.form.controls['pagename'].setValue("pagename")
    component.form.controls['pagedescription'].setValue("pagedescription")
    component.form.controls['pagemetatitle'].setValue("pagemetatitle")
    component.form.controls['pagemetakeywords'].setValue("pagemetakeywords")
    component.form.controls['pagemetadescription'].setValue("pagemetadescription")

    fixture.detectChanges();

    var result = component.createPage();

    result.then((val) => {
      expect(val).toEqual("True")
    })

  })

});
