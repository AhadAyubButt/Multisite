import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadReviewComponent } from './readreview.component';

describe('ReadreviewComponent', () => {
  let component: ReadReviewComponent;
  let fixture: ComponentFixture<ReadReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
