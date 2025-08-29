import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  user: User = { name:'', email:'', phone:'', role:'Student' };

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUsers().subscribe((data: User[]) => {
      const found = data.find(u => u.id === id);
      if(found) this.user = found;
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/admin/users']);
    });
  }
}

