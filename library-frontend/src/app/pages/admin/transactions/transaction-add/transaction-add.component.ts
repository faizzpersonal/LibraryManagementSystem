import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService, Transaction } from '../../../../services/transaction.service';
import { UserService, User } from '../../../../services/user.service';
import { BookService, Book } from '../../../../services/book.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html'
})
export class TransactionAddComponent implements OnInit {
  users: User[] = [];
  books: Book[] = [];

  newTransaction: Transaction = {
    user: { id: 0, name: '', email: '', phone: '', role: 'Student' },
    book: { id: 0, title: '', author: '', isbn: '', category: '', subCategory: '', year: 2024, noOfCopies: 1 },
    borrowDate: '',
    dueDate: '',
    status: 'Borrowed'
  };
  today: Date = new Date();


  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  


    this.userService.getUsers().subscribe((data: User[]) => this.users = data);


    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;

      this.route.queryParams.subscribe(params => {
        const bookId = params['bookId'];
        if (bookId) {
          const selected = this.books.find(b => b.id === +bookId);
          if (selected) {
            this.newTransaction.book = selected;
          }
        }
      });
    });
  }

  isBookAvailable(book: Book): boolean {
    return book.noOfCopies > 0;
  }

  addTransaction(): void { 
    if (!this.newTransaction.book || this.newTransaction.book.noOfCopies <= 0) {
      alert('Cannot borrow this book: no copies available.');
      return;
    }

    this.transactionService.addTransaction(this.newTransaction).subscribe(() => {
      this.router.navigate(['/admin/transactions']);
    }); 
  }
}
