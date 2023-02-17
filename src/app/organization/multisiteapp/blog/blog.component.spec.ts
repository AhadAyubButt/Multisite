import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from 'ngx-webstorage-service';
import { BlogsService } from '../../../Services/blogs.service';
import { IBlog } from '../../../Interfaces/blog_interface';
import { HttpService } from '../../../Services/http.service';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {

  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [BlogComponent]
    })
      .compileComponents();
  });

  it('Verify that blog is created with specified values', () => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;

    component.websiteName = 'websitename';

    let httpService: HttpService;
    let storageService: StorageService;

    const service = TestBed.get(BlogsService);

    const blog: IBlog = {
      DelFlag: "",
      id: '',
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
      BlogNewURL: '',
      BlogOldURL: '',
      BlogSchema: '',
      Featured_Blog_Flag: '',
      OrganiztionId: '',
      WebSiteName: ''

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

    spyOn(service, 'createBlog').withArgs(blog).and.returnValue(Promise.resolve('True'));

    component.form.controls.blogurl.setValue('blogurl');
    component.form.controls.blogname.setValue('blogname');
    component.form.controls.blogdescription.setValue('blogdescription');
    component.form.controls.blogmetatitle.setValue('blogmetatitle');
    component.form.controls.blogmetakeywords.setValue('blogmetakeywords');
    component.form.controls.blogmetadescription.setValue('blogmetadescription');

    fixture.detectChanges();
    const blogFinal = component.createBlog();
    if (undefined != blogFinal) {
      const result = blogFinal.then((val) => {
        expect(val).toEqual('True');
      });
    }


  });

});
