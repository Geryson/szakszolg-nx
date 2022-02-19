import { TestBed } from '@angular/core/testing';

import { MirrorWordService } from './mirror-word.service';

describe('MirrorWordService', () => {
  let service: MirrorWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MirrorWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
