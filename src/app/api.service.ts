import {Injectable} from '@angular/core';
import {GetUserResult, UserSearchResult} from './user-search.service';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  queryUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {
  }

  searchUsers(searchText: string, resultsPerPage: number, requestedPage: number): Observable<UserSearchResult> {
    return this.http.get<{ data: UserSearchResult }>('/.netlify/functions/getUsers', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'searchText': searchText,
        'resultsPerPage': resultsPerPage,
        'requestedPage': requestedPage,
      },
    }).pipe(map(x => x.data));
  }

  getUser(apiUrl: string): Observable<GetUserResult> {
    return this.http.get<{ data: GetUserResult }>('/.netlify/functions/getUser', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'apiUrl': apiUrl,
      },
    }).pipe(map(x => x.data));
  }
}
