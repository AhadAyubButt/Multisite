import { TestBed } from '@angular/core/testing';

import { AllReviewService } from './all-review.service';

describe('AllReviewService', () => {
  let service: AllReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
