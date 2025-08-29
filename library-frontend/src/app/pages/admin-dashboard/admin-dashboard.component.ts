import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, DashboardStats } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  stats: DashboardStats = {
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
    unpaidFines: 0
  };

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.adminService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }
}
