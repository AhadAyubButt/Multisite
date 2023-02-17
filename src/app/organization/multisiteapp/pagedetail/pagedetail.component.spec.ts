import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Navigation, NavigationExtras, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IWebPage } from '../../../Interfaces/webpage_interface';

import { PagedetailComponent } from './pagedetail.component';

describe('PagedetailComponent', () => {
  let component: PagedetailComponent;
  let fixture: ComponentFixture<PagedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ PagedetailComponent ]
    })
    .compileComponents();
    router = TestBed.get(Router)
    route = TestBed.get(ActivatedRoute)

  });

  let router:Router;
  let route:ActivatedRoute;

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PagedetailComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verify that all the values of the blog are shown properly', () => {

    let component: PagedetailComponent;
    let fixture: ComponentFixture<PagedetailComponent>;

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

    webpage.websiteName = "website";
    webpage.pageOldUrl = 'pageurl';
    webpage.pagename = 'pagename';
    webpage.pagedescription = 'pagedescription';
    webpage.pagemetatitle = 'pagemetatitle';
    webpage.pagemetakeywords = 'pagemetakeywords';
    webpage.pagemetadescription = 'pagemetadescription';

    const spyRoute = spyOn(router, 'getCurrentNavigation')

    const navigationExtras: NavigationExtras = {
      state: {
        page:webpage
      }
    };

    const tree: UrlTree =
      router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');

    let navigation:Navigation =
    {
      id: 1,
      initialUrl: "",
      extractedUrl: tree,
      finalUrl:undefined,
      trigger: 'imperative',
      extras: navigationExtras,
      previousNavigation: null
    };

    spyRoute.and.returnValue(navigation)

    fixture = TestBed.createComponent(PagedetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    fixture.whenStable().then(() => {

      expect(component.form.controls['pageurl'].value).toBe("pageurl");
      expect(component.form.controls['pagename'].value).toBe("pagename");
      expect(component.form.controls['pagedescription'].value).toBe("pagedescription");

      expect(component.form.controls['pagemetatitle'].value).toBe("pagemetatitle");
      expect(component.form.controls['pagemetakeywords'].value).toBe("pagemetakeywords");
      expect(component.form.controls['pagemetadescription'].value).toBe("pagemetadescription");

      console.log("Expect was called");

    })

  })


});
