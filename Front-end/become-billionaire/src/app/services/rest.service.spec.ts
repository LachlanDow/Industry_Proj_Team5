import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { RestService } from './rest.service';

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
