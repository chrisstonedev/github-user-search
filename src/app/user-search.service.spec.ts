import {TestBed} from '@angular/core/testing';
import {UserSearchService} from './user-search.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserSearchService', () => {
  let service: UserSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
