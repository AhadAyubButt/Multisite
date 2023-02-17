import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewPageListComponent } from './all-review-page-list.component';

describe('AllReviewPageListComponent', () => {
  let component: AllReviewPageListComponent;
  let fixture: ComponentFixture<AllReviewPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReviewPageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
