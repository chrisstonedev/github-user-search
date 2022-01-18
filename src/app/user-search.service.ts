import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  constructor(private apiService: ApiService) {
  }

  getUsers(searchText: string, requestedPage: number): UserSearchResult {
    let allUsers = this.apiService.getAllUsers(searchText);
    let totalCount = allUsers.length
    let page = allUsers.slice(10 * (requestedPage - 1), 10 * requestedPage);
    return {totalCount, page}
  }
}

export interface UserSearchResult {
  totalCount: number;
  page: string[];
}
