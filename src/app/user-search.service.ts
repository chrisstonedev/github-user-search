import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  private static getAllUsers(searchText: string): string[] {
    return searchText.split('');
  }

  searchForUsers(searchText: string): UserSearchResult {
    let allUsers = UserSearchService.getAllUsers(searchText);
    let totalCount = allUsers.length;
    let users = allUsers.slice(0, 10);
    let hasPreviousResults = false;
    let hasNextResults = allUsers.length > 10;
    return {totalCount, firstResult: {users, hasPreviousResults, hasNextResults}};
  }

  getPreviousResults(searchText: string, currentPage: number): PaginationResult {
    let allUsers = UserSearchService.getAllUsers(searchText);
    let nextResults = true;
    let users = allUsers.slice(10 * currentPage, 10 * (currentPage + 1));
    let previousResults = currentPage > 0;
    return {hasNextResults: nextResults, users, hasPreviousResults: previousResults};
  }

  getNextResults(searchText: string, currentPage: number): PaginationResult {
    let allUsers = UserSearchService.getAllUsers(searchText);
    let previousResults = true;
    let users = allUsers.slice(10 * currentPage, 10 * (currentPage + 1));
    let nextResults = allUsers.length > 10 * (currentPage + 1);
    return {hasPreviousResults: previousResults, users, hasNextResults: nextResults};
  }
}

export interface UserSearchResult {
  firstResult: PaginationResult;
  totalCount: number;
}

export interface PaginationResult {
  users: string[];
  hasPreviousResults: boolean;
  hasNextResults: boolean;
}
