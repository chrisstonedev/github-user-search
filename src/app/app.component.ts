import {Component} from '@angular/core';
import {GetUserResult, UserSearchService} from './user-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputText = '';
  searchText = '';
  totalCount = 0;
  usersOnPage?: GetUserResult[];
  currentPage = 0;
  hasPreviousPage = false;
  hasNextPage = false;
  error = false;

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
    this.userSearchService.getUsers(this.searchText, this.currentPage).subscribe({
      next: result => {
        this.totalCount = result.total_count;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.totalCount > 10 * this.currentPage;
        this.usersOnPage = result.items.map(x => ({login: x.login, avatar_url: x.avatar_url, html_url: x.html_url}));
        for (let item of result.items) {
          this.userSearchService.getUser(item.url).subscribe({
            next: value => {
              let itemToReplace = this.usersOnPage!.find(x => x.login === value.login)!;
              let index = this.usersOnPage!.indexOf(itemToReplace);
              this.usersOnPage![index] = value;
            },
            error: err => {
              this.error = true;
              console.error(err);
            }
          });
        }
      },
      error: err => {
        this.error = true;
        console.error(err);
      }
    });
  }
}
