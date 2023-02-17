
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IWebPage } from '../../../Interfaces/webpage_interface';
import {WebpagesService} from '../../../Services/webpages.service';
import { UpdatepageComponent } from './updatepage.component';

describe('UpdatepageComponent', () => {

  let component: UpdatepageComponent;
  let fixture: ComponentFixture<UpdatepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdatepageComponent ]
    })
    .compileComponents();
  });

  it('Verify that webpage is updated with specified values', () => {

    fixture = TestBed.createComponent(UpdatepageComponent);
    component = fixture.componentInstance;

    component.websiteName = "websitename";
    component.page.id = "10";

    component.page.websiteName = "websitename";
    component.page.pageNewUrl = "pageurl";
    component.page.pagename = "pagename";
    component.page.pagedescription = "pagedescription";

    component.page.pagemetatitle = "pagemetatitle";
    component.page.pagemetakeywords = "pagemetakeywords";
    component.page.pagemetadescription = "pagemetadescription";
    // component.page.type = "";

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

    webpage.websiteName = "websitename";
    webpage.pageNewUrl = 'pageurl';
    webpage.pagename = 'pagename';
    webpage.pagedescription = 'pagedescription';
    webpage.pagemetatitle = 'pagemetatitle';
    webpage.pagemetakeywords = 'pagemetakeywords';
    webpage.pagemetadescription = 'pagemetadescription';


    spyOn(service, 'updatePage').withArgs(webpage).and.returnValue(Promise.resolve("True"))

    fixture.detectChanges();

    var result = component.updatePage();
    result.then((val) => {
      expect(val).toEqual("True")
    })

  })

});
