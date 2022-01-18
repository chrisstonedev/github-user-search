import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  getAllUsers(searchText: string): string[] {
    return [searchText];
  }
}
