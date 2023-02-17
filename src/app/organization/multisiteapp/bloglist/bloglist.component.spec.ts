import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IBlog } from '../../../Interfaces/blog_interface';
import {BlogsService} from '../../../Services/blogs.service';

import { BloglistComponent } from './bloglist.component';

describe('BloglistComponent', () => {
  let component: BloglistComponent;
  let fixture: ComponentFixture<BloglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ BloglistComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(BloglistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Test the count of the blogs in database', async(() => {

    const service = TestBed.get(BlogsService);

    const blog: IBlog = {
      DelFlag: "",
      BlogAltText: '',
      BlogDescription: '',
      BlogImageURL: '',
      BlogImageURL1: '',
      BlogImageURL2: '',
      BlogImageURL3: '',
      BlogImageURL4: '',
      BlogMetaDataDescription: '',
      BlogMetaDataKeywords: '',
      BlogMetaDataTitle: '',
      BlogName: '',
      BlogSchema: '',
      BlogNewURL: '',
      BlogOldURL: '',
      Featured_Blog_Flag: '',
      OrganiztionId: '',
      WebSiteName: '',
      id: ''


    };

    // blog.websiteName = 'websitename';
    // blog.blogNewUrl = 'blogurl';
    // blog.blogname = 'blogname';
    // blog.blogdescription = 'blogdescription';
    //
    // blog.blogmetatitle = 'blogmetatitle';
    // blog.blogmetakeywords = 'blogmetakeywords';
    // blog.blogmetadescription = 'blogmetadescription';
    // blog.featuredblogflag = '1';

    spyOn(service, 'listBlogs').and.returnValue(Promise.resolve([blog]));

    fixture = TestBed.createComponent(BloglistComponent);
    component = fixture.componentInstance;
    component.listBlogs();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.blogsList.length).toBe(1);
      console.log('Expect was called');

    });

  }));

});
