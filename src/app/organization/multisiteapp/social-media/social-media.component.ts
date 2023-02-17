import {
  AfterViewInit,
  Component, Directive,
  ElementRef,
  Inject, Input,
  OnInit,
  Renderer2,
  RendererFactory2,
  ViewChild
} from '@angular/core';
import {ISocialMedia} from '../../../Interfaces/socialmedia_interface';
import {FormControl, FormGroup} from '@angular/forms';
import {WebsiteService} from '../../../Services/website.service';
import {SocialMediaService} from '../../../Services/social-media.service';
import {ImageService} from '../../../Services/image.service';
import {DOCUMENT, Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css', './loader.scss'],
})
export class SocialMediaComponent implements OnInit, AfterViewInit {
  files: File[] = [];
  isOpen = true;

  checkWebsites: string[] = [];
  websiteList: { Id: string, WebsiteName: string }[] = [];
  imageFilesVar: { name: string, file: string | ArrayBuffer | null } = {name: '', file: null};
  post: ISocialMedia = {
    Platform: "", WebsiteName: "", caption: "", imgName: "", postImageURL: ""

  };
  form: FormGroup = new FormGroup({
    caption: new FormControl('')
  });
  selectedValue = '';
  selection = false;
  msgdetail: string[] = [];
  @ViewChild('status') status?: ElementRef;
  @ViewChild('toggle') toggle?: ElementRef;

  constructor(private websiteService: WebsiteService,
              private socialService: SocialMediaService,
              private imageService: ImageService, private location: Location, private router: Router,
              private element: ElementRef,
              private route: ActivatedRoute) {
    // this.websiteList = this.websiteService.websiteList;
    this.websiteService.listWebsitePages().then((value: any) => {
      this.websiteList = value.Items;
    });


  }

  ngOnInit(): void {
    $('#click-menu')
      .removeClass('selected')
      .addClass('notselected');
    $('#new').removeClass('appear').addClass('disappear');
  }

  togglee() {
    this.isOpen = !this.isOpen;
  }

  onSelect(imgvar: { addedFiles: File[] }): void {
    for (const item of imgvar.addedFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        this.imageFilesVar = {
          name: item.name,
          file: reader.result
        };
      };
      reader.readAsDataURL(item);
      console.log(item);
      this.files.push(item);
    }

  }

  onCancel() {
    this.router.navigate(['multisite', 'listWebsites']);
  }

  onRemove(delfile: File): void {
    console.log(delfile);
    this.files.splice(this.files.indexOf(delfile), 1);
  }

  onSubmit(): void {
    this.msgdetail = [];
    if (this.selectedValue) {
      this.checkWebsites.forEach((val) => {
        this.post = {
          WebsiteName: this.selectedValue,
          Platform: val,
          caption: this.form.controls.caption.value,
          imgName: this.imageFilesVar.name,
          postImageURL: ''
        };
        this.socialService
          .createImage(
            this.post.WebsiteName,
            this.imageFilesVar.name,
            this.imageFilesVar.file
          )
          .subscribe((value1) => {
            this.post.postImageURL = value1.replace('https', 'http');
            this.socialService.publishPost(this.post).subscribe(
              (value: any) => {
                if (value?.status === 'Upload:Post') {
                  const elem: HTMLElement = this.status?.nativeElement;
                  $('.circle-loader', '#' + val).toggleClass('load-complete');
                  $('.checkmark-c', '#' + val).toggle();
                }
              },
              (reason) => {
                this.msgdetail.push(reason.status);
              },
              () => {
                setTimeout(() => {
                  this.router
                    .navigateByUrl('/multisite', { skipLocationChange: true })
                    .then(() => {
                      this.router.navigate(['/multisite/social-media'], {
                        relativeTo: this.route,
                      });
                    });
                }, 5000);
              }
            );
          });
        });
        // note: https to http
      console.log(this.status?.nativeElement)
      const native: HTMLElement = this.status?.nativeElement;
      native.style.display = 'flex';
      native.style.width = '100%';
    } else {
      alert("Please Select a Website");
    }
  }

  print($event: { target: any }): void {
    console.log($event.target?.name, $event.target?.value, $event.target?.checked);
    console.log($event);
    if ($event.target.checked) {
      this.checkWebsites.push($event.target.value);
    } else {
      const ind = this.checkWebsites.indexOf($event.target.value);
      this.checkWebsites.splice(ind, 1);
    }
    console.log(this.checkWebsites);
  }

  selectWebsite($event: any): void {
    console.log($event);
  }

  onChange($event: any): void {
    if (this.selectedValue === $event) {
      return;
    }
    this.selectedValue = $event;
    console.log(this.selectedValue);
  }

  onComplete(): void {
  }

  ngAfterViewInit() {
    console.log(this.toggle);

  }

}
