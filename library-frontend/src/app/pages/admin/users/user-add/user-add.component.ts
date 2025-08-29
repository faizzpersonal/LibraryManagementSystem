import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html'
})
export class UserAddComponent {
  newUser: User = { name:'', email:'', phone:'', role:'Student' };

  constructor(private userService: UserService, private router: Router) {}

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.router.navigate(['/admin/users']);
    });
  }
}
