import {Component, Input} from '@angular/core';
import {GetUserResult} from '../user-search.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user!: GetUserResult;
}
