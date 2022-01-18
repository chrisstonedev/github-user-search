import {Component} from '@angular/core';
import {UserSearchService} from "./user-search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputText = '';
  searchText = '';
  totalCount = 0;
  usersOnPage: string[] = [];
  currentPage = 0;
  hasPreviousPage = false;
  hasNextPage = false;

  constructor(private userSearchService: UserSearchService) {
  }

  searchForUsers() {
    this.searchText = this.inputText;
    let result = this.userSearchService.searchForUsers(this.searchText);
    this.totalCount = result.totalCount;
    this.usersOnPage = result.initialPage;
    this.currentPage = 0;
    this.hasPreviousPage = false;
    this.hasNextPage = this.totalCount > 10;
  }

  getPreviousResults() {
    this.inputText = this.searchText;
    this.currentPage--;
    this.usersOnPage = this.userSearchService.getPage(this.searchText, this.currentPage);
    this.hasNextPage = true;
    this.hasPreviousPage = this.currentPage > 0;
  }

  getNextResults() {
    this.inputText = this.searchText;
    this.currentPage++;
    this.usersOnPage = this.userSearchService.getPage(this.searchText, this.currentPage);
    this.hasPreviousPage = true;
    this.hasNextPage = this.totalCount > 10 * (this.currentPage + 1);
  }
}
