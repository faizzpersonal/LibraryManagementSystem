import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService, Transaction } from '../../../../services/transaction.service';
import { UserService, User } from '../../../../services/user.service';
import { BookService, Book } from '../../../../services/book.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html'
})
export class TransactionEditComponent implements OnInit {
  users: User[] = [];
  books: Book[] = [];
  transaction: Transaction = {
    borrowDate: '',
    dueDate: '',
    status: 'Borrowed',
    user: {id:0, name:'', email:'', phone:'', role:''},
    book: {id:0, title:'', author:'', isbn:'', category:'', subCategory:'', year:2024, noOfCopies:1}
  };
  today = new Date()

  selectedUserId!: number;
  selectedBookId!: number;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      if(this.transaction.user) this.selectedUserId = this.transaction.user.id!;
    });
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      if(this.transaction.book) this.selectedBookId = this.transaction.book.id!;
    });

    this.transactionService.getTransactions().subscribe(data => {
      const found = data.find(tx => tx.id === id);
      if(found) {
        this.transaction = found;
        this.selectedUserId = this.transaction.user.id!;
        this.selectedBookId = this.transaction.book.id!;
      }
    });
  }

  updateTransaction(): void {
    this.transaction.user = this.users.find(u => u.id === this.selectedUserId)!;
    this.transaction.book = this.books.find(b => b.id === this.selectedBookId)!;

    this.transactionService.updateTransaction(this.transaction).subscribe(() => {
      this.router.navigate(['/admin/transactions']);
    });
  }
}
