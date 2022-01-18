import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  constructor(private apiService: ApiService) {
  }

  getUsers(searchText: string, requestedPage: number): UserSearchResult {
    return this.apiService.searchUsers(searchText, requestedPage);
  }
}

export interface UserSearchResult {
  totalCount: number;
  users: User[];
}

export interface User {
  login: string;
}
