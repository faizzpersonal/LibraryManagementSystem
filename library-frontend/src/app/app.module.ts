import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { BookListComponent } from './pages/admin/books/book-list/book-list.component';
import { BookAddComponent } from './pages/admin/books/book-add/book-add.component';
import { BookEditComponent } from './pages/admin/books/book-edit/book-edit.component';
import { UserListComponent } from './pages/admin/users/user-list/user-list.component';
import { UserAddComponent } from './pages/admin/users/user-add/user-add.component';
import { UserEditComponent } from './pages/admin/users/user-edit/user-edit.component';
import { TransactionListComponent } from './pages/admin/transactions/transaction-list/transaction-list.component';
import { TransactionAddComponent } from './pages/admin/transactions/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './pages/admin/transactions/transaction-edit/transaction-edit.component';
import { FineListComponent } from './pages/admin/fines/fine-list/fine-list.component';
import { FineAddComponent } from './pages/admin/fines/fine-add/fine-add.component';
import { FineEditComponent } from './pages/admin/fines/fine-edit/fine-edit.component';

import { HomeComponent } from './pages/user/home/home.component';
import { AboutComponent } from './pages/user/about/about.component';
import { ContactComponent } from './pages/user/contact/contact.component';
import { BooksComponent } from './pages/user/books/books.component';

import { NavbarComponent } from './pages/user/navbar/navbar.component';
import { AdminNavbarComponent } from './pages/admin/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    BookListComponent,
    BookAddComponent,
    BookEditComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    TransactionListComponent,
    TransactionAddComponent,
    TransactionEditComponent,
    FineListComponent,
    FineAddComponent,
    FineEditComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
