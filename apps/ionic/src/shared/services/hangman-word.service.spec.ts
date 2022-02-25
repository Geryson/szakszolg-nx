import { TestBed } from '@angular/core/testing';

import { HangmanWordService } from './hangman-word.service';

describe('HangmanWordService', () => {
  let service: HangmanWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HangmanWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
