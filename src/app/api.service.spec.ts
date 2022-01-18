import {TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {UserSearchResult} from './user-search.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpSpy: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpSpy = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse requested fields', () => {
    const testData: UserSearchResult = {total_count: 26, items: [{login: 'Test Data'}]};

    httpSpy.get<UserSearchResult>(service.queryUrl)
      .subscribe(data =>
        expect(data).toEqual(jasmine.objectContaining(testData))
      );

    const request = httpController.expectOne(service.queryUrl);
    expect(request.request.method).toEqual('GET');

    const objectWithAdditionalFields = {...testData, extraParameter: 'hi', otherStuff: 4};
    request.flush(objectWithAdditionalFields);
    httpController.verify();
  });
});
