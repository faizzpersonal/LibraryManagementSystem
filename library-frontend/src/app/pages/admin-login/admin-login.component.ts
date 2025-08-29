import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:8080/api/admin/login', 
      { username: this.username, password: this.password }, 
      { responseType: 'text' })
      .subscribe({
        next: (token) => {
          localStorage.setItem('adminToken', token);
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => {
          this.error = 'Invalid username or password';
        }
      });
  }
}
