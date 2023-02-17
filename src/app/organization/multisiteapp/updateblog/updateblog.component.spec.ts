import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateblogComponent } from './updateblog.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from 'ngx-webstorage-service';
import { BlogsService } from '../../../Services/blogs.service';
import { IBlog } from '../../../Interfaces/blog_interface';
import { HttpService } from '../../../Services/http.service';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateblogComponent', () => {

  let component: UpdateblogComponent;
  let fixture: ComponentFixture<UpdateblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ UpdateblogComponent ]
    })
    .compileComponents();
  });

  it('Verify that blog is updated with specified values', () => {

    fixture = TestBed.createComponent(UpdateblogComponent);
    component = fixture.componentInstance;

    // UpdateblogComponent.websiteName = 'websitename';
    // component.blogObject.websiteName = 'websitename';
    // component.blogObject.blogNewUrl = 'blogurl';
    // component.blogObject.blogname = 'blogname';
    // component.blogObject.blogdescription = 'blogdescription';
    // component.blogObject.id = '10';
    // component.blogObject.blogmetatitle = 'blogmetatitle';
    // component.blogObject.blogmetakeywords = 'blogmetakeywords';
    // component.blogObject.blogmetadescription = 'blogmetadescription';
    // component.blogObject.featuredblogflag = '1';

    const service = TestBed.get(BlogsService);

    const blog: IBlog = {
      BlogAltText: '',
      BlogDescription: '',
      BlogImageURL: '',
      BlogImageURL1: '',
      BlogImageURL2: '',
      BlogImageURL3: '',
      BlogImageURL4: '',
      BlogSchema: '',
      BlogMetaDataDescription: '',
      BlogMetaDataKeywords: '',
      BlogMetaDataTitle: '',
      BlogName: '',
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
    // blog.id = '10';
    // blog.blogmetatitle = 'blogmetatitle';
    // blog.blogmetakeywords = 'blogmetakeywords';
    // blog.blogmetadescription = 'blogmetadescription';
    // blog.featuredblogflag = '1';

    spyOn(service, 'updateBlog').withArgs(blog).and.returnValue(Promise.resolve('True'));

    fixture.detectChanges();

    const result = component.updateBlog();
    result.then((val) => {
      expect(val).toEqual('True');
    });

  });



});
