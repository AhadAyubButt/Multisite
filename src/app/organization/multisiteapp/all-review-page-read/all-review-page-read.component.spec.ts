import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewPageReadComponent } from './all-review-page-read.component';

describe('AllReviewPageReadComponent', () => {
  let component: AllReviewPageReadComponent;
  let fixture: ComponentFixture<AllReviewPageReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReviewPageReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewPageReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
