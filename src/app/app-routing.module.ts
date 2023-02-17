import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {OrganizationComponent} from './organization/organization.component';
import {BlogComponent} from './organization/multisiteapp/blog/blog.component';
import {BloglistComponent} from './organization/multisiteapp/bloglist/bloglist.component';
import {PageComponent} from './organization/multisiteapp/page/page.component';
import {PagedetailComponent} from './organization/multisiteapp/pagedetail/pagedetail.component';
import {PagelistComponent} from './organization/multisiteapp/pagelist/pagelist.component';
import {ProductComponent} from './organization/multisiteapp/product/product.component';
import {ProductcategoryComponent} from './organization/multisiteapp/productcategory/productcategory.component';
import {ProductcategorylistComponent} from './organization/multisiteapp/productcategorylist/productcategorylist.component';
import {ProductlistComponent} from './organization/multisiteapp/productlist/productlist.component';
import {MultisiteAppComponent} from './organization/multisiteapp/multisiteapp.component';
import {WebsitelistComponent} from './organization/multisiteapp/websitelist/websitelist.component';
import {ProductcategorydetailComponent} from './organization/multisiteapp/productcategorydetail/productcategorydetail.component';
import {UpdateproductComponent} from './organization/multisiteapp/updateproduct/updateproduct.component';
import {UpdateblogComponent} from './organization/multisiteapp/updateblog/updateblog.component';
import {UpdateproductcategoryComponent} from './organization/multisiteapp/updateproductcategory/updateproductcategory.component';
import {UpdatepageComponent} from './organization/multisiteapp/updatepage/updatepage.component';

import {AllproductsComponent} from './organization/multisiteapp/allproducts/allproducts.component';
import {UpdateallproductsComponent} from './organization/multisiteapp/updateallproducts/updateallproducts.component';
import {AllproductslistComponent} from './organization/multisiteapp/allproductslist/allproductslist.component';
import {AllblogsComponent} from './organization/multisiteapp/allblogs/allblogs.component';
import {AllblogslistComponent} from './organization/multisiteapp/allblogslist/allblogslist.component';
import {UpdateallblogsComponent} from './organization/multisiteapp/updateallblogs/updateallblogs.component';
import {HomepageComponent} from './organization/multisiteapp/homepage/homepage.component';
import {HomepagelistComponent} from './organization/multisiteapp/homepagelist/homepagelist.component';
import {UpdatehomepageComponent} from './organization/multisiteapp/updatehomepage/updatehomepage.component';
import {BlogReadComponent} from './organization/multisiteapp/blog-read/blog-read.component';

import {BehaviorComponent} from './organization/multisiteapp/analytics/behavior/behavior.component';
import {AudienceComponent} from './organization/multisiteapp/analytics/audience/audience.component';
import {AcquisitionComponent} from './organization/multisiteapp/analytics/acquisition/acquisition.component';

import {SocialMediaComponent} from './organization/multisiteapp/social-media/social-media.component';

import {ReviewComponent} from './organization/multisiteapp/review/review.component';
import {ReviewlistComponent} from './organization/multisiteapp/reviewlist/reviewlist.component';
import {ReadReviewComponent} from './organization/multisiteapp/readreview/readreview.component';
import {AddwebsiteComponent} from './organization/multisiteapp/addwebsite/addwebsite.component';
import {ProductReadComponent} from './organization/multisiteapp/product-read/product-read.component';
import {CanActivateTeam} from './organization/cutom_canactivate';
import {AllReviewPageComponent} from "./organization/multisiteapp/all-review-page/all-review-page.component";
import {AllReviewPageListComponent} from "./organization/multisiteapp/all-review-page-list/all-review-page-list.component";
import {AllReviewPageReadComponent} from "./organization/multisiteapp/all-review-page-read/all-review-page-read.component";
import {RoutingGuardGuard} from "./routing-guard.guard";
import { ReportbugComponent } from "./reportbug/reportbug.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'org',
    pathMatch: 'full',
  },
  {
    path: 'org',
    component: OrganizationComponent,

  },
  {
    path: 'multisite',
    component: MultisiteAppComponent,
    canActivate: [CanActivateTeam],
    children: [
      // TODO : Find why /multisiteapp is required here
      {
        path: 'reportBug',
        component: ReportbugComponent,
      },
      {
        path: 'audience',
        component: AudienceComponent,
      },
      {
        path: 'acquisition',
        component: AcquisitionComponent,
      },

      {
        path: 'behavior',
        component: BehaviorComponent,
      },

      {
        path: 'social-media',
        component: SocialMediaComponent,
      },

      {
        path: 'createwebsite',
        component: AddwebsiteComponent,
      },

      {
        path: 'listWebsites',
        component: WebsitelistComponent,
      },

      {
        path: 'listProducts',
        component: ProductlistComponent,
      },
      {
        path: 'editProduct',
        component: ProductComponent,
        canDeactivate: [RoutingGuardGuard]
      },
      {
        path: 'updateProduct',
        component: UpdateproductComponent,

      },
      {
        path: 'viewProduct',
        component: ProductReadComponent,
        canDeactivate: [RoutingGuardGuard]

      },

      {
        path: 'readBlog',
        component: BlogReadComponent,
        canDeactivate: [RoutingGuardGuard]


      },
      {
        path: 'listBlogs',
        component: BloglistComponent,
      },
      {
        path: 'updateBlog',
        component: UpdateblogComponent,
      },
      {
        path: 'createBlog',
        component: BlogComponent,
        canDeactivate: [RoutingGuardGuard]

      },

      {
        path: 'listReview',
        component: ReviewlistComponent,
      },
      {
        path: 'readReview',
        component: ReadReviewComponent,
        canDeactivate: [RoutingGuardGuard]

      },
      {
        path: 'createReview',
        component: ReviewComponent,
        canDeactivate: [RoutingGuardGuard]

      },
      {
        path: 'createHomePage',
        component: HomepageComponent,
      },
      {
        path: 'listAllBlogsPage',
        component: AllblogslistComponent,
      },
      {
        path: 'createAllBlogs',
        component: AllblogsComponent,
      },
      {
        path: 'listHomePage',
        component: HomepagelistComponent,
      },
      {
        path: 'updateHomePage',
        component: UpdatehomepageComponent,
      },

      {
        path: 'updateAllBlogs',
        component: UpdateallblogsComponent,
      },

      {
        path: 'listAllProductsPage',
        component: AllproductslistComponent,
      },
      {
        path: 'createAllProducts',
        component: AllproductsComponent,
      },
      {
        path: 'updateAllProducts',
        component: UpdateallproductsComponent,
      },
      {
        path: 'listProductCategories',
        component: ProductcategorylistComponent,
      },
      {
        path: 'viewProductCategory',
        component: ProductcategorydetailComponent,
      },
      {
        path: 'createProductCategory',
        component: ProductcategoryComponent,
        canDeactivate: [RoutingGuardGuard]

      },
      {
        path: 'updateProductCategory',
        component: UpdateproductcategoryComponent,
      },
      {
        path: 'listPages',
        component: PagelistComponent,
      },
      {
        path: 'viewPage',
        component: PagedetailComponent,
      },
      {
        path: 'editPage',
        component: PageComponent,
      },
      {
        path: 'updatepage',
        component: UpdatepageComponent,
      },
      {path:'createAllReviews', component: AllReviewPageComponent},
      {path:'listAllReviewsPage', component: AllReviewPageListComponent},
      {path:'readAllReview', component: AllReviewPageReadComponent}
    ],
  },
  {
    path: '**',
    redirectTo: 'org'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
