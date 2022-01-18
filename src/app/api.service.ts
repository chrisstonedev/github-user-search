import {Injectable} from '@angular/core';
import {GetUserResult, UserSearchResult} from './user-search.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  queryUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {
  }

  searchUsers(searchText: string, requestedPage: number): Observable<UserSearchResult> {
    let headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env['GITHUB_ACCESS_TOKEN']}`
    });
    let params = new HttpParams({
      fromObject: {
        'q': searchText,
        'per_page': 10,
        'page': requestedPage
      }
    });
    return this.http.get<UserSearchResult>(this.queryUrl, {headers, params});
  }

  getUser(apiUrl: string): Observable<GetUserResult> {
    let headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env['GITHUB_ACCESS_TOKEN']}`
    });
    return this.http.get<GetUserResult>(apiUrl, {headers});
  }
}
