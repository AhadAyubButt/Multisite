import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { OrganizationComponent } from './organization/organization.component';

import { MultisiteAppComponent } from './organization/multisiteapp/multisiteapp.component';
import { ProductComponent } from './organization/multisiteapp/product/product.component';
import { ProductcategoryComponent } from './organization/multisiteapp/productcategory/productcategory.component';
import { BlogComponent } from './organization/multisiteapp/blog/blog.component';
import { PageComponent } from './organization/multisiteapp/page/page.component';

import { PagedetailComponent } from './organization/multisiteapp/pagedetail/pagedetail.component';
import { ProductcategorydetailComponent } from './organization/multisiteapp/productcategorydetail/productcategorydetail.component';

import { PagelistComponent } from './organization/multisiteapp/pagelist/pagelist.component';
import { BloglistComponent } from './organization/multisiteapp/bloglist/bloglist.component';
import { WebsitelistComponent } from './organization/multisiteapp/websitelist/websitelist.component';
import { ProductlistComponent } from './organization/multisiteapp/productlist/productlist.component';
import { ProductcategorylistComponent } from './organization/multisiteapp/productcategorylist/productcategorylist.component';

import { UpdateproductComponent } from './organization/multisiteapp/updateproduct/updateproduct.component';
import { UpdateblogComponent } from './organization/multisiteapp/updateblog/updateblog.component';
import { UpdateproductcategoryComponent } from './organization/multisiteapp/updateproductcategory/updateproductcategory.component';
import { UpdatepageComponent } from './organization/multisiteapp/updatepage/updatepage.component';

import {DataTablesModule} from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ImageService } from './Services/image.service';

import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './organization/login-button/login-button.component';
import { LogoutButtonComponent } from './organization/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './organization/authentication-button/authentication-button.component';
import { AuthNavComponent } from './organization/auth-nav/auth-nav.component';
import { NavBarComponent } from './organization/nav-bar/nav-bar.component';

import { AllproductsComponent } from './organization/multisiteapp/allproducts/allproducts.component';
import { UpdateallproductsComponent } from './organization/multisiteapp/updateallproducts/updateallproducts.component';
import { AllproductslistComponent } from './organization/multisiteapp/allproductslist/allproductslist.component';
import { AllblogsComponent } from './organization/multisiteapp/allblogs/allblogs.component';
import { AllblogslistComponent } from './organization/multisiteapp/allblogslist/allblogslist.component';
import { UpdateallblogsComponent } from './organization/multisiteapp/updateallblogs/updateallblogs.component';
import { HomepageComponent } from './organization/multisiteapp/homepage/homepage.component';
import { HomepagelistComponent } from './organization/multisiteapp/homepagelist/homepagelist.component';
import { UpdatehomepageComponent } from './organization/multisiteapp/updatehomepage/updatehomepage.component';
import { BlogReadComponent } from './organization/multisiteapp/blog-read/blog-read.component';


import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor'
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import { AudienceComponent } from './organization/multisiteapp/analytics/audience/audience.component';
import { AcquisitionComponent } from './organization/multisiteapp/analytics/acquisition/acquisition.component';
import { BehaviorComponent } from './organization/multisiteapp/analytics/behavior/behavior.component';
import { SocialMediaComponent} from './organization/multisiteapp/social-media/social-media.component';
import { ReviewComponent } from './organization/multisiteapp/review/review.component';
import { ReviewlistComponent } from './organization/multisiteapp/reviewlist/reviewlist.component';
import { ReadReviewComponent } from './organization/multisiteapp/readreview/readreview.component';
import { AddwebsiteComponent } from './organization/multisiteapp/addwebsite/addwebsite.component';
import { ProductReadComponent } from './organization/multisiteapp/product-read/product-read.component';
import {CanActivateTeam} from './organization/cutom_canactivate'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AllReviewPageListComponent } from './organization/multisiteapp/all-review-page-list/all-review-page-list.component';
import {AllReviewPageComponent} from "./organization/multisiteapp/all-review-page/all-review-page.component";
import { AllReviewPageReadComponent } from './organization/multisiteapp/all-review-page-read/all-review-page-read.component';
import {RoutingGuardGuard} from "./routing-guard.guard";
import { ReportbugComponent } from './reportbug/reportbug.component';

@NgModule({

  declarations: [

    AppComponent,
    OrganizationComponent,
    WebsitelistComponent,
    MultisiteAppComponent,
    ProductlistComponent,
    ProductComponent,
    ProductcategoryComponent,
    ProductcategorydetailComponent,
    ProductcategorylistComponent,
    BloglistComponent,
    BlogComponent,
    PagelistComponent,
    PagedetailComponent,
    PageComponent,
    UpdateproductComponent,
    UpdateblogComponent,
    UpdateproductcategoryComponent,
    UpdatepageComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    AuthNavComponent,
    NavBarComponent,
    AllproductsComponent,
    UpdateallproductsComponent,
    AllproductslistComponent,
    AllblogsComponent,
    AllblogslistComponent,
    UpdateallblogsComponent,
    HomepageComponent,
    HomepagelistComponent,
    UpdatehomepageComponent,
    BlogReadComponent,
    AudienceComponent,
    AcquisitionComponent,
    BehaviorComponent,
    SocialMediaComponent,
    ReviewComponent,
    ReviewlistComponent,
    ReadReviewComponent,
    AddwebsiteComponent,
    ProductReadComponent,
    AllReviewPageComponent,
    AllReviewPageListComponent,
    AllReviewPageReadComponent,
    ReportbugComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    DataTablesModule,
    NgxEditorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    MatDialogModule,
    MatButtonModule,
    // 👇 add and initialize AuthModule
    // AuthModule.forRoot({
    //   ...env.auth,
    // }),
    FroalaEditorModule,
    FroalaViewModule
  ],
  providers: [
    ImageService,
    CanActivateTeam,
    RoutingGuardGuard
  ],
  bootstrap: [AppComponent],

})

export class AppModule {

  constructor() {
  }

}
