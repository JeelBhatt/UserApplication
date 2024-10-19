import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/interfaces/user';
import { TableLazyLoadEvent } from 'primeng/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  displayHeader:string[] = ['firstName','lastName','age','address'];
  totalRecords: number = 0;
  isLoading: boolean = false;
  first: number = 0;
  sortField: string = 'firstName';
  sortOrder: string = 'asc'; 
  searchInput!: string;
  rowsPerPage: number = 5;

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {    
     // Subscribe to the search subject and set a debounce time of 10 00ms
     this.searchSubject.pipe(
      debounceTime(1000),        
      distinctUntilChanged()        
    ).subscribe(searchText => {
      this.searchUser(searchText); 
    });
  }

  // Get Users
  getUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.rowsPerPage, this.first, this.displayHeader.toString(),this.sortField,this.sortOrder).subscribe((res) => {
      this.users = res.users;
      this.totalRecords = res.total; 
      this.isLoading = false;
    });
  }

  onPageChange(event: any) {
      this.first = event.first;
      this.rowsPerPage = event.rows;
      if(this.searchInput) {
        this.searchUser(this.searchInput);
      } else {
        this.getUsers();
      }
  }

  sortUser(event: any) {
    this.sortField = event.field || event.sortField;
    this.sortOrder = event.order === 1 || event.sortOrder === 1 ? 'asc' : 'desc';

    this.getUsers();
   }

  onSearch(val: string) {
    this.searchSubject.next(val);
  }

  // Search User
  searchUser(searchText: string) {
    this.searchInput = searchText;
    this.userService.searchUsers(this.rowsPerPage, this.first, this.displayHeader.toString(),searchText).subscribe((res) => {
      this.users = res.users;
      this.totalRecords = res.total; 
    });
  }

  ngOnDestroy(): void {
    if(this.searchSubject) {
    this.searchSubject.unsubscribe();
    }
  }
}
