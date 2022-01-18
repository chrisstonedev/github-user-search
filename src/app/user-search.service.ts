import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  constructor(private apiService: ApiService) {
  }

  searchForUsers(searchText: string): UserSearchResult {
    let allUsers = this.apiService.getAllUsers(searchText);
    let totalCount = allUsers.length;
    let initialPage = allUsers.slice(0, 10);
    return {totalCount, initialPage};
  }

  getPage(searchText: string, requestedPage: number): string[] {
    let allUsers = this.apiService.getAllUsers(searchText);
    return allUsers.slice(10 * requestedPage, 10 * (requestedPage + 1));
  }
}

export interface UserSearchResult {
  initialPage: string[];
  totalCount: number;
}
