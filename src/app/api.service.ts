import {Injectable} from '@angular/core';
import {UserSearchResult} from "./user-search.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {
  }

  searchUsers(searchText: string, requestedPage: number): UserSearchResult {
    let allUsers = searchText.split('').map(x => ({login: x}));
    let totalCount = allUsers.length;
    let users = allUsers.slice(10 * (requestedPage - 1), 10 * requestedPage);
    return {totalCount, users};
  }
}
