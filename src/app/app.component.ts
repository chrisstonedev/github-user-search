import {Component} from '@angular/core';
import {PaginationResult, UserSearchService} from "./user-search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputText = '';
  searchText = '';
  totalCount: number | undefined;
  result: PaginationResult | undefined;
  currentPage = 0;

  constructor(private userSearchService: UserSearchService) {
  }

  searchForUsers() {
    this.searchText = this.inputText;
    let result = this.userSearchService.searchForUsers(this.searchText);
    this.totalCount = result.totalCount;
    this.result = result.firstResult;
    this.currentPage = 0;
  }

  getPreviousResults() {
    this.inputText = this.searchText;
    this.currentPage--;
    this.result = this.userSearchService.getPreviousResults(this.searchText, this.currentPage);
  }

  getNextResults() {
    this.inputText = this.searchText;
    this.currentPage++;
    this.result = this.userSearchService.getNextResults(this.searchText, this.currentPage);
  }
}
