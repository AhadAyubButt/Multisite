import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IWebPage } from '../../../Interfaces/webpage_interface';
import {WebpagesService} from '../../../Services/webpages.service';
import { PagelistComponent } from './pagelist.component';

describe('PagelistComponent', () => {
  let component: PagelistComponent;
  let fixture: ComponentFixture<PagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ PagelistComponent ]
    })
    .compileComponents();
  });

  it('Test the count of the pages in database', async(() => {

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

    spyOn(service, 'listPages').and.returnValue(Promise.resolve([webpage]))

    fixture = TestBed.createComponent(PagelistComponent);
    component = fixture.componentInstance;
    component.listPages();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.pagesList.length).toBe(1);
      console.log("Expect was called");

    })

  }))


  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PagelistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
