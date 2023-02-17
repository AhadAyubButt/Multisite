import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitelistComponent } from './websitelist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { WebsiteService } from '../../../Services/website.service';
import { IWebSite } from '../../../Interfaces/website_interface';

describe('WebsitelistComponent', () => {

  let component: WebsitelistComponent;
  let fixture: ComponentFixture<WebsitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ WebsitelistComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(WebsitelistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Test the count of the websites in database', async(() => {

    let service = TestBed.get(WebsiteService);

    let website:IWebSite = {
      id: "",
      websiteName: "",
      websiteImageURL: "",
      OrganizationId: "1",
      Logo: ''
    };

    spyOn(service, 'listWebsites').and.returnValue(Promise.resolve([website]))

    fixture = TestBed.createComponent(WebsitelistComponent);
    component = fixture.componentInstance;
    component.listWebsites();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.websiteList.length).toBe(1);
      console.log("Expect was called");

    })

  }))


});
