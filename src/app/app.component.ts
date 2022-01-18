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
  usersOnPage: string[] | undefined;
  currentPage = 0;
  hasPreviousPage = false;
  hasNextPage = false;

  constructor(private userSearchService: UserSearchService) {
  }

  searchForUsers() {
    this.searchText = this.inputText;
    this.currentPage = 1;
    this.getUsersAndProcessResults();
  }

  getPreviousResults() {
    this.inputText = this.searchText;
    this.currentPage--;
    this.getUsersAndProcessResults();
  }

  getNextResults() {
    this.inputText = this.searchText;
    this.currentPage++;
    this.getUsersAndProcessResults();
  }

  private getUsersAndProcessResults() {
    let result = this.userSearchService.getUsers(this.searchText, this.currentPage);
    this.totalCount = result.totalCount;
    this.usersOnPage = result.page;
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.totalCount > 10 * this.currentPage;
  }
}
