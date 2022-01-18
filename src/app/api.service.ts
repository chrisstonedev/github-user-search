import {Injectable} from '@angular/core';
import {UserSearchResult} from "./user-search.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  queryUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {
  }

  searchUsers(searchText: string, requestedPage: number): Observable<UserSearchResult> {
    let headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
    let params = new HttpParams()
      .set('q', searchText)
      .append('per_page', 10)
      .append('page', requestedPage);
    return this.http.get<UserSearchResult>(this.queryUrl, {headers, params});
  }
}
