import { TestBed } from '@angular/core/testing';

import { QuizIdService } from './quiz-id.service';

describe('QuizIdService', () => {
  let service: QuizIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
