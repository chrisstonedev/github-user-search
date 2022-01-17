import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentText = '';
  allUsers: string[] = [];
  users: string[] = [];
  previousResults = false;
  nextResults = false;
  totalCount: number | undefined;
  currentPage = 0;

  searchForUsers() {
    this.allUsers = this.currentText.split('');
    this.totalCount = this.allUsers.length;
    this.users = this.allUsers.slice(0, 10);
    this.previousResults = false;
    this.nextResults = this.allUsers.length > 10;
    this.currentPage = 0;
  }

  getPreviousResults() {
    this.nextResults = true;
    this.currentPage--;
    this.users = this.allUsers.slice(10 * this.currentPage, 10 * (this.currentPage + 1));
    this.previousResults = this.currentPage > 0;
  }

  getNextResults() {
    this.previousResults = true;
    this.currentPage++;
    this.users = this.allUsers.slice(10 * this.currentPage, 10 * (this.currentPage + 1));
    this.nextResults = this.allUsers.length > 10 * (this.currentPage + 1);
  }
}
