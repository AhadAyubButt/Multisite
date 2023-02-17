/* tslint:disable:variable-name max-line-length */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {retry, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IProduct} from '../Interfaces/product_interface';
import {IProductCategory} from '../Interfaces/product_category_interface';
import {IBlog} from '../Interfaces/blog_interface';
import {IWebPage} from '../Interfaces/webpage_interface';
import {IUser} from '../Interfaces/user_interface';
import {IAllProducts} from '../Interfaces/allproducts_interface';
import {IAllBlogs} from '../Interfaces/allblogs_interface';
import {IHomePage} from '../Interfaces/homepage_interface';
import {ISocialMedia} from '../Interfaces/socialmedia_interface';
import {IReview} from '../Interfaces/review_interface';
import {IWebSite} from '../Interfaces/website_interface';
import {IAllReview} from "../Interfaces/all-review-page.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private AUTH_LOGIN =
    '';
  private READ_ORGANIZATION_REST_API_SERVER =
    '';
  private CREATE_IMAGE_REST_API_SERVER =
    '';
  private S3_BUCKET_URL =
    '';
  private GET_FROALA_IMAGE_FROM_S3 =
    '';
  private GET_WEBSITE_LIST_REST_API_SERVER =
    '';
  
  private CREATE_PRODUCT_REST_API_SERVER =
    '';
  private READ_PRODUCT_REST_API_SERVER =
    '';
  private LIST_PRODUCT_REST_API_SERVER =
    '';
  
  private UPDATE_PRODUCT_REST_API_SERVER =
    '';

  private DELETE_PRODUCT_REST_API_SERVER =
    '';

  private UPDATE_FLAG_REST_API_SERVER =
    '';

  private CREATE_PRODUCT_CATEGORY_REST_API_SERVER =
    '';
  private LIST_PRODUCT_CATEGORY_REST_API_SERVER =
    '';
  private UPDATE_PRODUCT_CATEGORY_REST_API_SERVER =
    '';

  private CREATE_WEBPAGE_REST_API_SERVER =
    '';
  private LIST_WEBPAGE_REST_API_SERVER =
    '';
  private UPDATE_WEB_PAGE_REST_API_SERVER =
    '';

  private CREATE_BLOG_REST_API_SERVER =
    '';

  private LIST_BLOG_REST_API_SERVER =
    '';
  private UPDATE_BLOG_REST_API_SERVER =
    '';
  private READ_BLOG_REST_API_SERVER =
    '';

  private DELETE_BLOG_REST_API_SERVER =
    '';

  private CREATE_REVIEW_REST_API_SERVER =
    '';
  private LIST_REVIEW_REST_API_SERVER =
    '';
  private READ_REVIEW_REST_API_SERVER =
    '';
  private UPDATE_REVIEW_REST_API_SERVER =
    '';

  private CREATE_WEBSITE_REST_API_SERVER =
    '';

  private CREATE_USER_REST_API_SERVER =
    '';
  private UPDATE_USER_REST_API_SERVER =
    '';
  private LIST_USERS_REST_API_SERVER =
    '';

  private CREATE_USER_ROLE_REST_API_SERVER =
    '';
  private UPDATE_USER_ROLE_REST_API_SERVER =
    '';
  private LIST_USER_ROLE_REST_API_SERVER =
    '';

  private CREATE_ALL_PRODUCTS_REST_API_SERVER =
    '';
  private UPDATE_ALL_PRODUCTS_REST_API_SERVER =
    '';

  private LIST_ALL_PRODUCTS_REST_API_SERVER =
    '';

  private CREATE_ALL_BLOGS_REST_API_SERVER =
    '';
  private LIST_ALL_BLOGS_REST_API_SERVER =
    '';

  private UPDATE_ALL_BLOGS_REST_API_SERVER =
    '';
  private READ_USER_REST_API_SERVER =
    '';

  private CREATE_HOME_PAGE_REST_API_SERVER =
    '';
  private UPDATE_HOME_PAGE_REST_API_SERVER =
    '';
  private LIST_HOME_PAGE_REST_API_SERVER =
    '';

  private CREATE_POST_REST_API_SERVER =
    '';
  private LIST_PAGES_REST_API_SERVER =
    '';
  private LIST_ALLREVIEW_REST_API_SERVER =
    '';
  private CREATE_ALLREVIEW_REST_API_SERVER =
    '';
  private READ_ALLREVIEW_REST_API_SERVER =
    '';
  private UPDATE_ALLREVIEW_REST_API_SERVER =
    '';
  constructor(private httpClient: HttpClient) {
  }

  onLogin(user: IUser): Observable<HttpResponse<Object> | undefined> {

    return this.httpClient
      .get(this.AUTH_LOGIN, {
        params: new HttpParams({fromString: ''})
          .append('UserName', user.UserName)
          .append('Password', user.Password),
        observe: 'response'
      })
  }

  listUserRoles(websiteName: string): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websiteName;

    return new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_USER_ROLE_REST_API_SERVER, {
          params: new HttpParams({fromString: ''}),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });
  }

  listPages(
    websiteName: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    const OrganiztionId = '1212';

    return new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_WEBPAGE_REST_API_SERVER, {
          params: new HttpParams({fromString: ''})
            .append('access_token', access_token)
            .append('OrganiztionId', OrganiztionId)
            .append('WebSiteName', websiteName)
            .append('user_id', user_id),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });
  }


  listUsers(websiteName: string): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websiteName;

    const promise = new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_USERS_REST_API_SERVER, {
          params: new HttpParams({fromString: ''}),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });

    return promise;
  }

  listHomePage(
    websiteName: string,
    access_token: string
  ): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websiteName;

    const OrganiztionId = '1212';

    const promise = new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_HOME_PAGE_REST_API_SERVER, {
          params: new HttpParams({fromString: urlString.toString()})
            .append('access_token', access_token)
            .append('WebSiteName', websiteName)
            .append('OrganiztionId', OrganiztionId),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });

    return promise;
  }

  listAllBlogs(
    websiteName: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websiteName;

    const OrganiztionId = '1212';

    const promise = new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_ALL_BLOGS_REST_API_SERVER, {
          params: new HttpParams({fromString: urlString.toString()})
            .append('access_token', access_token)
            .append('WebSiteName', websiteName)
            .append('OrganiztionId', OrganiztionId)
            .append('user_id', user_id),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });

    return promise;
  }

  listAllProducts(
    websiteName: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websiteName;

    const OrganiztionId = '1212';

    const promise = new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_ALL_PRODUCTS_REST_API_SERVER, {
          params: new HttpParams({fromString: urlString.toString()})
            .append('access_token', access_token)
            .append('WebSiteName', websiteName)
            .append('OrganiztionId', OrganiztionId)
            .append('user_id', user_id),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });

    return promise;
  }

  listProducts(
    websiteName: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websiteName;

    const OrganiztionId = '1212';

    const promise = new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_PRODUCT_REST_API_SERVER, {
          params: new HttpParams({fromString: urlString.toString()})
            .append('access_token', access_token)
            .append('WebSiteName', websiteName)
            .append('OrganiztionId', OrganiztionId)
            .append('user_id', user_id),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });

    return promise;
  }

  listProductCategories(
    websitename: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let urlString: string;

    urlString = 'OrganiztionId=';
    urlString += '1212';

    urlString += '&';
    urlString += 'WebSiteName=';
    urlString += websitename;

    const OrganiztionId = '1212';

    const promise = new Promise<any>((resolve) => {
      this.httpClient
        .get(this.LIST_PRODUCT_CATEGORY_REST_API_SERVER, {
          params: new HttpParams({fromString: ''})
            .append('access_token', access_token)
            .append('WebSiteName', websitename)
            .append('OrganiztionId', OrganiztionId)
            .append('user_id', user_id),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          resolve(value);
        });
    });

    return promise;
  }

  handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
  }

  public listBlogs(
    websiteName: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<object> | undefined> {
    let OrganizationId: string;
    OrganizationId = '1212';


    return this.httpClient
      .get(this.LIST_BLOG_REST_API_SERVER, {
        params: new HttpParams({fromString: ''})
          .append('access_token', access_token)
          .append('WebSiteName', websiteName)
          .append('OrganiztionId', OrganizationId)
          .append('user_id', user_id),
        observe: 'response'
      })
      .toPromise();
  }

  public listReviews(
    websiteName: string,
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let OrganizationId: string;
    OrganizationId = '1212';

    return this.httpClient
      .get(this.LIST_REVIEW_REST_API_SERVER, {
        params: new HttpParams({fromString: ''})
          .append('access_token', access_token)
          .append('WebSiteName', websiteName)
          .append('OrganiztionId', OrganizationId)
          .append('user_id', user_id),
        observe: 'response'
      })
      .toPromise();
  }

  public listWebsites(
    access_token: string,
    user_id: string
  ): Promise<HttpResponse<Object> | undefined> {
    let OrganizationId: string;
    OrganizationId = '1212';

    return this.httpClient
      .get(this.GET_WEBSITE_LIST_REST_API_SERVER, {
        params: new HttpParams({fromString: ''})
          .append('access_token', access_token)
          .append('user_id', user_id),
        observe: 'response'
      })
      .toPromise();
  }

  createAllBlogs(allBlogs: IAllBlogs): Promise<object | undefined> {
    let OrganizationId: string;
    OrganizationId = '1212';

    allBlogs.OrganiztionId = OrganizationId;

    return this.httpClient
      .post(this.CREATE_ALL_BLOGS_REST_API_SERVER, JSON.stringify(allBlogs))
      .toPromise();
  }

  createHomePage(homepage: IHomePage): Promise<object | undefined> {
    homepage.OrganiztionId = '1212';
    return this.httpClient
      .post(this.CREATE_HOME_PAGE_REST_API_SERVER, JSON.stringify(homepage))
      .toPromise();
  }

  updateHomePage(homepage: IHomePage): Promise<object | undefined> {
    homepage.OrganiztionId = '1212';
    return this.httpClient
      .post(this.UPDATE_HOME_PAGE_REST_API_SERVER, JSON.stringify(homepage))
      .toPromise();
  }

  createProductCategory(productCategory: IProductCategory): Promise<object | undefined> {
    let OrganizationId: string;
    let PCParentCategoryId: string;

    PCParentCategoryId = '12';
    OrganizationId = '1212';

    const productcategoryobj = {
      OrganiztionId: OrganizationId,
      WebSiteName: productCategory.WebSiteName,
      PCNewURL: productCategory.PCNewURL,
      PCOldURL: productCategory.PCOldURL,
      PCName: productCategory.PCName,
      PCDescription: productCategory.PCDescription,
      PCParentCategoryId: productCategory.PCParentCategoryId,
      PCMetaDataTitle: productCategory.PCMetaDataTitle,
      PCMetaDataKeywords: productCategory.PCMetaDataKeywords,
      PCMetaDataDescription: productCategory.PCMetaDataDescription,
      access_token: productCategory.access_token,
      user_id: productCategory.user_id
    };

    return this.httpClient
      .post(
        this.CREATE_PRODUCT_CATEGORY_REST_API_SERVER,
        JSON.stringify(productcategoryobj)
      )
      .toPromise();
  }

  updateProduct(product: IProduct): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';

    if (product.ProductImageURL1 === undefined) {
      product.ProductImageURL1 = '';
    }
    if (product.ProductImageURL2 === undefined) {
      product.ProductImageURL2 = '';
    }
    if (product.ProductImageURL3 === undefined) {
      product.ProductImageURL3 = '';
    }
    if (product.ProductImageURL4 === undefined) {
      product.ProductImageURL4 = '';
    }
    if (product.ProductImageURL5 === undefined) {
      product.ProductImageURL5 = '';
    }

    const productobj: IProduct = {
      DelFlag: "",
      id: product.id,
      OrganiztionId: OrganizationId,
      WebSiteName: product.WebSiteName,

      ProductNewURL: product.ProductNewURL,
      ProductOldURL: product.ProductOldURL,
      ProductCategory: product.ProductCategory,

      ProductSchema: product.ProductSchema,

      ProductName: product.ProductName,
      ProductShortDescription: product.ProductShortDescription,
      ProductDetailedDescription: product.ProductDetailedDescription,

      ProductAltText1: product.ProductAltText1,
      ProductAltText2: product.ProductAltText2,
      ProductAltText3: product.ProductAltText3,
      ProductAltText4: product.ProductAltText4,
      ProductAltText5: product.ProductAltText5,

      ProductImageURL1: product.ProductImageURL1,
      ProductImageURL2: product.ProductImageURL2,
      ProductImageURL3: product.ProductImageURL3,
      ProductImageURL4: product.ProductImageURL4,
      ProductImageURL5: product.ProductImageURL5,

      ProductMetaDataTitle: product.ProductMetaDataTitle,
      ProductMetaDataKeywords: product.ProductMetaDataKeywords,
      ProductMetaDataDescription: product.ProductMetaDataDescription,

      ProductRelatedProductId1: product.ProductRelatedProductId1,
      ProductRelatedProductId2: product.ProductRelatedProductId2,
      ProductRelatedProductId3: product.ProductRelatedProductId3,
      ProductRelatedProductId4: product.ProductRelatedProductId4,
      ProductRelatedProductId5: product.ProductRelatedProductId5
    };

    return this.httpClient
      .post(this.UPDATE_PRODUCT_REST_API_SERVER, JSON.stringify(productobj))
      .toPromise();
  }

  deleteProduct(id: string): Promise<any> {
    return this.httpClient
      .get(this.UPDATE_FLAG_REST_API_SERVER, {
        params: new HttpParams({fromString: ''}).append('id', id).append('tableName', 'Products')
      })
      .toPromise();
  }

  deleteBlog(id: string): Promise<any> {
    return this.httpClient
      .get(this.UPDATE_FLAG_REST_API_SERVER, {
        params: new HttpParams({fromString: ''}).append('id', id).append('tableName', 'Blogs')
      })
      .toPromise();
  }

  deleteReview(id: string): Promise<any> {
    return this.httpClient
      .get(this.UPDATE_FLAG_REST_API_SERVER, {
        params: new HttpParams({fromString: ''}).append('id', id).append('tableName', 'Reviews')
      })
      .toPromise();
  }

  updateAllBlogs(allBlogs: IAllBlogs): Promise<object | undefined> {
    allBlogs.OrganiztionId = '1212';
    return this.httpClient
      .post(this.UPDATE_ALL_BLOGS_REST_API_SERVER, JSON.stringify(allBlogs))
      .toPromise();
  }

  updateProductCategory(
    productCategory: IProductCategory,
    access_token: string
  ): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';

    const productcategoryobj: IProductCategory = {
      id: productCategory.id,
      OrganiztionId: OrganizationId,
      WebSiteName: productCategory.WebSiteName,

      PCNewURL: productCategory.PCNewURL,
      PCOldURL: productCategory.PCOldURL,

      PCName: productCategory.PCName,
      PCDescription: productCategory.PCDescription,
      PCParentCategoryId: productCategory.PCParentCategoryId,
      PCMetaDataTitle: productCategory.PCMetaDataTitle,
      PCMetaDataKeywords: productCategory.PCMetaDataKeywords,
      PCMetaDataDescription: productCategory.PCMetaDataDescription,
      access_token,
      user_id: productCategory.user_id
    };

    return this.httpClient
      .post(
        this.UPDATE_PRODUCT_CATEGORY_REST_API_SERVER,
        JSON.stringify(productcategoryobj)
      )
      .toPromise();
  }

  updateBlog(blog: IBlog): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';

    if (blog.BlogImageURL1 === undefined) {
      blog.BlogImageURL1 = '';
    }
    if (blog.BlogImageURL2 === undefined) {
      blog.BlogImageURL2 = '';
    }
    if (blog.BlogImageURL3 === undefined) {
      blog.BlogImageURL3 = '';
    }
    if (blog.BlogImageURL4 === undefined) {
      blog.BlogImageURL4 = '';
    }
    if (blog.BlogImageURL === undefined) {
      blog.BlogImageURL = '';
    }

    const blogobj: IBlog = {
      BlogAltText: blog.BlogAltText,
      OrganiztionId: OrganizationId,
      WebSiteName: blog.WebSiteName,
      BlogNewURL: blog.BlogNewURL,
      BlogOldURL: blog.BlogOldURL,
      BlogSchema: blog.BlogSchema,
      BlogName: blog.BlogName,
      BlogDescription: blog.BlogDescription,
      Featured_Blog_Flag: blog.Featured_Blog_Flag,
      BlogMetaDataTitle: blog.BlogMetaDataTitle,
      BlogMetaDataKeywords: blog.BlogMetaDataKeywords,
      BlogMetaDataDescription: blog.BlogMetaDataDescription,
      BlogImageURL: blog.BlogImageURL,
      BlogImageURL1: blog.BlogImageURL1,
      BlogImageURL2: blog.BlogImageURL2,
      BlogImageURL3: blog.BlogImageURL3,
      BlogImageURL4: blog.BlogImageURL4,
      id: blog.id,
      DelFlag: ''
    };

    return this.httpClient
      .post(this.UPDATE_BLOG_REST_API_SERVER, JSON.stringify(blogobj))
      .toPromise();
  }

  updateReview(review: IReview): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';

    if (review.ReviewImageURL1 === undefined) {
      review.ReviewImageURL1 = '';
    }
    if (review.ReviewImageURL2 === undefined) {
      review.ReviewImageURL2 = '';
    }
    if (review.ReviewImageURL3 === undefined) {
      review.ReviewImageURL3 = '';
    }
    if (review.ReviewImageURL4 === undefined) {
      review.ReviewImageURL4 = '';
    }
    if (review.ReviewImageURL === undefined) {
      review.ReviewImageURL = '';
    }

    const reviewobj: IReview = {
      ReviewAltText: review.ReviewAltText,
      OrganiztionId: OrganizationId,
      WebSiteName: review.WebSiteName,
      ReviewNewURL: review.ReviewNewURL,
      ReviewOldURL: review.ReviewOldURL,
      ReviewSchema: review.ReviewSchema,
      ReviewName: review.ReviewName,
      ReviewDescription: review.ReviewDescription,
      Featured_Review_Flag: review.Featured_Review_Flag,
      ReviewMetaDataTitle: review.ReviewMetaDataTitle,
      ReviewMetaDataKeywords: review.ReviewMetaDataKeywords,
      ReviewMetaDataDescription: review.ReviewMetaDataDescription,
      ReviewImageURL: review.ReviewImageURL,
      ReviewImageURL1: review.ReviewImageURL1,
      ReviewImageURL2: review.ReviewImageURL2,
      ReviewImageURL3: review.ReviewImageURL3,
      ReviewImageURL4: review.ReviewImageURL4,
      id: review.id,
      DelFlag: ''
    };

    return this.httpClient
      .post(this.UPDATE_REVIEW_REST_API_SERVER, JSON.stringify(reviewobj))
      .toPromise();
  }

  updateStaticPage(
    webpage: IWebPage,
    access_token: any,
    user_id: string
  ): Promise<object | undefined> {
    let OrganizationId: string;
    OrganizationId = '1212';

    const staticpageobj = {
      id: webpage.id,
      OrganiztionId: OrganizationId,
      WebSiteName: webpage.websiteName,

      SPNewURL: webpage.pageNewUrl,
      SPOldURL: webpage.pageOldUrl,

      SPTitle: webpage.pagename,
      SPType: webpage.pagetype,
      SPDescription: webpage.pagedescription,
      SPMetaDataTitle: webpage.pagemetatitle,
      SPMetaDataKeywords: webpage.pagemetakeywords,
      SPMetaDataDescription: webpage.pagemetadescription,
      access_token,
      user_id
    };

    return this.httpClient
      .post(this.UPDATE_WEB_PAGE_REST_API_SERVER, JSON.stringify(staticpageobj))
      .toPromise();
  }

  updateUserRole(userRole: any): Promise<object | undefined> {
    let OrganizationId: string;
    OrganizationId = '1212';

    userRole.user_role_organization_id = OrganizationId;

    const userRoleObject = {
      user_role_id: userRole.user_role_id,
      user_role_name: userRole.user_role_name,
      user_role_description: userRole.user_role_description,
      websiteName: userRole.user_role_website_name,

      product_create_permission: userRole.product_create_permission,
      product_read_permission: userRole.product_read_permission,
      product_update_permission: userRole.product_update_permission,
      product_delete_permission: userRole.product_delete_permission,
      product_list_permission: userRole.product_list_permission,

      product_category_create_permission:
      userRole.product_category_create_permission,
      product_category_read_permission:
      userRole.product_category_read_permission,
      product_category_update_permission:
      userRole.product_category_update_permission,
      product_category_delete_permission:
      userRole.product_category_delete_permission,
      product_category_list_permission:
      userRole.product_category_list_permission,

      blogs_create_permission: userRole.blogs_create_permission,
      blogs_read_permission: userRole.blogs_read_permission,
      blogs_update_permission: userRole.blogs_update_permission,
      blogs_delete_permission: userRole.blogs_delete_permission,
      blogs_list_permission: userRole.blogs_list_permission,

      webpages_create_permission: userRole.webpages_create_permission,
      webpages_read_permission: userRole.webpages_read_permission,
      webpages_update_permission: userRole.webpages_update_permission,
      webpages_delete_permission: userRole.webpages_delete_permission,
      webpages_list_permission: userRole.webpages_list_permission,
      user_role_organization_id: userRole.user_role_organization_id,
      user_role_website_name: userRole.user_role_website_name
    };

    return this.httpClient
      .post(
        this.UPDATE_USER_ROLE_REST_API_SERVER,
        JSON.stringify(userRoleObject)
      )
      .toPromise();
  }

  createAllProducts(allProducts: IAllProducts): Promise<object | undefined> {
    allProducts.OrganiztionId = '1212';
    return this.httpClient
      .post(
        this.CREATE_ALL_PRODUCTS_REST_API_SERVER,
        JSON.stringify(allProducts)
      )
      .toPromise();
  }

  updateAllProducts(allProducts: IAllProducts): Promise<object | undefined> {
    allProducts.OrganiztionId = '1212';
    return this.httpClient
      .post(
        this.UPDATE_ALL_PRODUCTS_REST_API_SERVER,
        JSON.stringify(allProducts)
      )
      .toPromise();
  }

  createProduct(product: IProduct): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';

    if (product.ProductImageURL1 === undefined) {
      product.ProductImageURL1 = '';
    }
    if (product.ProductImageURL2 === undefined) {
      product.ProductImageURL2 = '';
    }
    if (product.ProductImageURL3 === undefined) {
      product.ProductImageURL3 = '';
    }
    if (product.ProductImageURL4 === undefined) {
      product.ProductImageURL4 = '';
    }
    if (product.ProductImageURL5 === undefined) {
      product.ProductImageURL5 = '';
    }

    // Find some way in which string of an interace could be obtained directly.
    // TODO : No need to construct a separate object here. Set Organization id directly.

    const productobj: IProduct = {
      DelFlag: "",
      id: '',
      OrganiztionId: OrganizationId,
      WebSiteName: product.WebSiteName,

      ProductNewURL: product.ProductNewURL,
      ProductOldURL: product.ProductOldURL,
      ProductCategory: product.ProductCategory,

      ProductSchema: product.ProductSchema,

      ProductName: product.ProductName,
      ProductShortDescription: product.ProductShortDescription,
      ProductDetailedDescription: product.ProductDetailedDescription,

      ProductAltText1: product.ProductAltText1,
      ProductAltText2: product.ProductAltText2,
      ProductAltText3: product.ProductAltText3,
      ProductAltText4: product.ProductAltText4,
      ProductAltText5: product.ProductAltText5,

      ProductImageURL1: product.ProductImageURL1,
      ProductImageURL2: product.ProductImageURL2,
      ProductImageURL3: product.ProductImageURL3,
      ProductImageURL4: product.ProductImageURL4,
      ProductImageURL5: product.ProductImageURL5,

      ProductMetaDataTitle: product.ProductMetaDataTitle,
      ProductMetaDataKeywords: product.ProductMetaDataKeywords,
      ProductMetaDataDescription: product.ProductMetaDataDescription,

      ProductRelatedProductId1: product.ProductRelatedProductId1,
      ProductRelatedProductId2: product.ProductRelatedProductId2,
      ProductRelatedProductId3: product.ProductRelatedProductId3,
      ProductRelatedProductId4: product.ProductRelatedProductId4,
      ProductRelatedProductId5: product.ProductRelatedProductId5
    };

    return this.httpClient
      .post(this.CREATE_PRODUCT_REST_API_SERVER, JSON.stringify(productobj))
      .toPromise();
  }

  public createWebPage(
    webpage: IWebPage,
    access_token: string
  ): Promise<object | undefined> {
    let OrganizationId: string;
    let pagetype: string;

    OrganizationId = '1212';
    pagetype = 'Static';

    const staticpageobj = {
      OrganiztionId: OrganizationId,
      WebSiteName: webpage.websiteName,

      SPNewURL: webpage.pageNewUrl,
      SPOldURL: webpage.pageOldUrl,

      SPTitle: webpage.pagename,
      SPType: webpage.pagetype,

      SPDescription: webpage.pagedescription,
      SPMetaDataTitle: webpage.pagemetatitle,

      SPMetaDataKeywords: webpage.pagemetakeywords,
      SPMetaDataDescription: webpage.pagemetadescription,

      access_token,
      user_id: webpage.user_id
    };

    return this.httpClient
      .post(this.CREATE_WEBPAGE_REST_API_SERVER, JSON.stringify(staticpageobj))
      .toPromise();
  }

  // This method should be passed organization id and website name
  public createBlog(blog: IBlog): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';
    if (blog.BlogImageURL1 === undefined) {
      blog.BlogImageURL1 = '';
    }
    if (blog.BlogImageURL2 === undefined) {
      blog.BlogImageURL2 = '';
    }
    if (blog.BlogImageURL3 === undefined) {
      blog.BlogImageURL3 = '';
    }
    if (blog.BlogImageURL4 === undefined) {
      blog.BlogImageURL4 = '';
    }
    if (blog.BlogImageURL === undefined) {
      blog.BlogImageURL = '';
    }

    const blogobj: IBlog = {
      BlogAltText: blog.BlogAltText,
      OrganiztionId: OrganizationId,
      WebSiteName: blog.WebSiteName,
      BlogNewURL: blog.BlogNewURL,
      BlogOldURL: blog.BlogOldURL,
      BlogSchema: blog.BlogSchema,
      Featured_Blog_Flag: blog.Featured_Blog_Flag,
      BlogName: blog.BlogName,
      BlogDescription: blog.BlogDescription,
      BlogMetaDataTitle: blog.BlogMetaDataTitle,
      BlogMetaDataKeywords: blog.BlogMetaDataKeywords,
      BlogMetaDataDescription: blog.BlogMetaDataDescription,
      BlogImageURL: blog.BlogImageURL,
      BlogImageURL1: blog.BlogImageURL1,
      BlogImageURL2: blog.BlogImageURL2,
      BlogImageURL3: blog.BlogImageURL3,
      BlogImageURL4: blog.BlogImageURL4,
      id: blog.id,
      DelFlag: ''
    };
    return this.httpClient
      .post(this.CREATE_BLOG_REST_API_SERVER, JSON.stringify(blogobj))
      .toPromise();
  }

  public createWebsite(website: IWebSite): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';

    if (website.websiteImageURL === undefined) {
      website.websiteImageURL = '';
    }

    const websiteobj: IWebSite = {
      websiteName: website.websiteName,

      websiteImageURL: website.websiteImageURL,

      id: website.id,
      OrganizationId: '1',
      Logo: ''
    };
    // console.log(blogobj);
    return this.httpClient
      .post(this.CREATE_WEBSITE_REST_API_SERVER, JSON.stringify(websiteobj))
      .toPromise();
  }

  public createReview(review: IReview): Promise<object | undefined> {
    let OrganizationId: string;

    OrganizationId = '1212';
    if (review.ReviewImageURL1 === undefined) {
      review.ReviewImageURL1 = '';
    }
    if (review.ReviewImageURL2 === undefined) {
      review.ReviewImageURL2 = '';
    }
    if (review.ReviewImageURL3 === undefined) {
      review.ReviewImageURL3 = '';
    }
    if (review.ReviewImageURL4 === undefined) {
      review.ReviewImageURL4 = '';
    }
    if (review.ReviewImageURL === undefined) {
      review.ReviewImageURL = '';
    }

    const reviewobj: IReview = {
      ReviewAltText: review.ReviewAltText,
      OrganiztionId: OrganizationId,
      WebSiteName: review.WebSiteName,
      ReviewNewURL: review.ReviewNewURL,
      ReviewOldURL: review.ReviewOldURL,
      ReviewSchema: review.ReviewSchema,
      Featured_Review_Flag: review.Featured_Review_Flag,
      ReviewName: review.ReviewName,
      ReviewDescription: review.ReviewDescription,
      ReviewMetaDataTitle: review.ReviewMetaDataTitle,
      ReviewMetaDataKeywords: review.ReviewMetaDataKeywords,
      ReviewMetaDataDescription: review.ReviewMetaDataDescription,
      ReviewImageURL: review.ReviewImageURL,
      ReviewImageURL3: review.ReviewImageURL3,
      ReviewImageURL4: review.ReviewImageURL2,
      ReviewImageURL2: review.ReviewImageURL3,
      ReviewImageURL1: review.ReviewImageURL1,
      id: review.id,
      DelFlag: ''
    };
    // console.log(blogobj);
    return this.httpClient
      .post(this.CREATE_REVIEW_REST_API_SERVER, JSON.stringify(reviewobj))
      .toPromise();
  }

  readBlog(id: string, accessToken: string, userId: string): Promise<any> {
    return this.httpClient
      .get(this.READ_BLOG_REST_API_SERVER, {
        params: new HttpParams({fromString: ''})
          .append('access_token', accessToken)
          .append('id', id)
          .append('user_id', userId)
      })
      .toPromise();
  }

  readProduct(id: string): Promise<object | undefined> {
    return this.httpClient.get(this.READ_PRODUCT_REST_API_SERVER, {
      params: new HttpParams({fromString: ''})
        .append('id', id)
    }).toPromise();
  }

  readReview(id: string, accessToken: string, userId: string): Promise<any> {
    return this.httpClient
      .get(this.READ_REVIEW_REST_API_SERVER, {
        params: new HttpParams({fromString: ''})
          .append('access_token', accessToken)
          .append('id', id)
          .append('user_id', userId)
      })
      .toPromise();
  }

  public readAllProducts(): void {
  }

  public readOrganization(
    userName: string,
    password: string
  ): Observable<HttpResponse<Object> | undefined> {
    // Add safe, URL encoded _page and _limit parameters
    // console.log("User name")
    let urlString: string;
    urlString = 'UserName=';
    urlString += userName;
    urlString += '&';
    urlString += 'Password=';
    urlString += password;
    console.log(urlString);

    return this.httpClient
      .get(this.READ_ORGANIZATION_REST_API_SERVER, {
        params: new HttpParams({fromString: urlString.toString()}),
        observe: 'response'
      })
      .pipe(
        retry(3),
        tap((res) => {
          console.log(res);
        })
      );
  }

  public createImage(
    websiteName: string,
    Name: string,
    File: string | null | ArrayBuffer
  ): string {
    const imageobj = {name: Name.toString(), file: File?.toString()};

    this.httpClient
      .post(this.CREATE_IMAGE_REST_API_SERVER, JSON.stringify(imageobj))
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body', val);
        },
        (response) => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
    return this.S3_BUCKET_URL + '/' + Name;
  }

  public getImageFromS3(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.httpClient
        .get(this.GET_FROALA_IMAGE_FROM_S3, {
          params: new HttpParams({fromString: ''}),
          observe: 'response'
        })
        .toPromise()
        .then((value) => {
          console.log(value);
          resolve(value);
        });
    });
  }

  publishPost(post: ISocialMedia): Observable<object | undefined> {
    if (post.Platform === 'Facebook') {
      return this.httpClient
        .post(
          '',
          JSON.stringify(post)
        )
    } else if (post.Platform === 'Instagram') {
      return this.httpClient
        .post(
          '',
          JSON.stringify(post)
        )

    } else if (post.Platform === 'Twitter') {
      return this.httpClient
        .post(this.CREATE_POST_REST_API_SERVER, JSON.stringify(post))
    } else if (post.Platform === 'Linkedin') {
      return this.httpClient
        .post(
          '',
          JSON.stringify(post)
        )
    } else {
      return of({});
    }
  }

  listWebsitePages(): Promise<object | undefined> {
    return this.httpClient.get(this.LIST_PAGES_REST_API_SERVER).toPromise();
  }

  listAllReview(websiteName: string): Observable<Object> {
    return this.httpClient.get(this.LIST_ALLREVIEW_REST_API_SERVER, {
      params: new HttpParams({fromString: ''})
        .append('OrganiztionId', websiteName)
        .append('WebSiteName', websiteName )
    });
  }
  createAllReview(allreview: IAllReview){
    return this.httpClient.post(this.CREATE_ALLREVIEW_REST_API_SERVER, JSON.stringify(allreview));
  }
  reaAllReview(id: string): Observable<Object> {
    return this.httpClient.get(this.READ_ALLREVIEW_REST_API_SERVER, {params: new HttpParams({fromString: ''})
        .append('id', id)});
  }
  updateAllReview(allreview: IAllReview): Observable<Object> {
    return this.httpClient.post(this.UPDATE_ALLREVIEW_REST_API_SERVER, JSON.stringify(allreview));

  }
}
