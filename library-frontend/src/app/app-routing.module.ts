import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { BookAddComponent } from './pages/admin/books/book-add/book-add.component';
import { BookEditComponent } from './pages/admin/books/book-edit/book-edit.component';
import { BookListComponent } from './pages/admin/books/book-list/book-list.component';
import { UserAddComponent } from './pages/admin/users/user-add/user-add.component';
import { UserEditComponent } from './pages/admin/users/user-edit/user-edit.component';
import { UserListComponent } from './pages/admin/users/user-list/user-list.component';
import { TransactionAddComponent } from './pages/admin/transactions/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './pages/admin/transactions/transaction-edit/transaction-edit.component';
import { TransactionListComponent } from './pages/admin/transactions/transaction-list/transaction-list.component';
import { FineAddComponent } from './pages/admin/fines/fine-add/fine-add.component';
import { FineEditComponent } from './pages/admin/fines/fine-edit/fine-edit.component';
import { FineListComponent } from './pages/admin/fines/fine-list/fine-list.component';
import { AboutComponent } from './pages/user/about/about.component';
import { ContactComponent } from './pages/user/contact/contact.component';
import { HomeComponent } from './pages/user/home/home.component';
import { BooksComponent } from './pages/user/books/books.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/books', component: BookListComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/books/add', component: BookAddComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/books/edit/:id', component: BookEditComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/users', component: UserListComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/users/add', component: UserAddComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/users/edit/:id', component: UserEditComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/transactions', component: TransactionListComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/transactions/add', component: TransactionAddComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/transactions/edit/:id', component: TransactionEditComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/fines', component: FineListComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/fines/add', component: FineAddComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/fines/edit/:id', component: FineEditComponent, canActivate: [AdminAuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
