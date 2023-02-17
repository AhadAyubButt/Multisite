import { TestBed } from '@angular/core/testing';

import { ForalaImageService } from './forala-image.service';

describe('ForalaImageService', () => {
  let service: ForalaImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForalaImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
