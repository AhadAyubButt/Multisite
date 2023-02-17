/* tslint:disable:variable-name */
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { BlogsService } from '../../../Services/blogs.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { WebsiteService } from '../../../Services/website.service';
import { IBlog } from '../../../Interfaces/blog_interface';
import { STORAGE_KEY_CURRENT_WEBSITE_NAME } from '../../../localstoragekeys';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LIST_BLOG } from 'src/assets/error.contants';


@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css'],
})
export class BloglistComponent implements OnInit {
  blogsList: Array<IBlog> = [];

  constructor(
    private blogsService: BlogsService,
    public dialog: MatDialog,
    private websiteService: WebsiteService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  ngOnInit(): void {
    console.log('In blogs list');
    this.listBlogs();
  }

  readBlog(blogId: string): void {
    const websitename = this.storage.get(STORAGE_KEY_CURRENT_WEBSITE_NAME);

    const navigationExtras: NavigationExtras = {
      state: {
        blog: blogId,
      },
    };
    this.router
      .navigate(['/multisite', 'readBlog'], navigationExtras)
      .then((value) => console.log(value));
    // });
  }

  listBlogs() {
    let websiteName: string;
    websiteName = this.websiteService.getCurrentWebsiteName();
    this.blogsList = [];
    this.blogsService.listBlogs(websiteName, '', '').then((value)=> {
      console.log('NEW CODE',value)
      for(const item of value){
        if (item.DelFlag === '1'){
            this.blogsList.push(item);
          }
      }
    });
  }

  openDialog(id: string) {
    PopUp.id= id;
    console.log(PopUp.id)
    this.dialog.open(PopUp)
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'pop-up',
  template: `<h1 mat-dialog-title class="main">Delete Product</h1>
  <div mat-dialog-content class="content">Are you sure you want to delete this product?</div>
  <div mat-dialog-actions>
    <button mat-button class="del"(click)='del()'>Delete</button>
    <button mat-button mat-dialog-close (click)='close()'>Close</button>
  </div>`,
  styles: [
    '.main {margin-top:10px; color: white; text-align: center; font-weight: bold}',
    '.content {color: white; margin-bottom: 16px; margin-top: 0px}',
    '.del{background-color: #f44336; color: white; margin:5px}',
    'button{align-items: center}'
  ],
})
export class PopUp{
  static id: string;
  constructor(public dialogRef: MatDialogRef<PopUp>, private prodServ: BlogsService, private router: Router, private route: ActivatedRoute) { }

  close(){
    this.dialogRef.close()
  }
  del(){
    console.log(PopUp.id)
    this.prodServ.deleteBlog(PopUp.id).then((value) => {
      if(value.status=="updated"){
        this.close();
        this.router.navigateByUrl('/multisite', { skipLocationChange: true }).then(() => {
          this.router
            .navigate(['/multisite/listBlogs'], { relativeTo: this.route,  })
            .then((value1) => {
              console.log('value1 is', value1);
            });
        });
      }
    });

  }
}
