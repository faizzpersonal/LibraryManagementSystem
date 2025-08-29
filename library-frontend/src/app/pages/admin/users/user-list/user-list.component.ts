import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => this.users = data);
  }

  deleteUser(id: number): void {
    if(confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

  addUser(): void {
    this.router.navigate(['/admin/users/add']);
  }
}

