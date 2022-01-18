import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  constructor(private apiService: ApiService) {
  }

  getUsers(searchText: string, requestedPage: number): Observable<UserSearchResult> {
    return this.apiService.searchUsers(searchText, requestedPage);
  }

  getUser(userLogin: string): Observable<GetUserResult> {
    return this.apiService.getUser(userLogin);
  }
}

export interface UserSearchResult {
  items: UserSearchItem[];
  total_count: number;
}

export interface UserSearchItem {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
}

export interface GetUserResult {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}
