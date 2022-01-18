import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  constructor(private apiService: ApiService) {
  }

  getUsers(searchText: string, requestedPage: number): Observable<UserSearchResult> {
    return this.apiService.searchUsers(searchText, requestedPage);
  }
}

export interface UserSearchResult {
  items: User[];
  total_count: number;
}

export interface User {
  login: string;
}
