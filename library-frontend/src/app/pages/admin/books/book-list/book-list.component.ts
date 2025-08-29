import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService, Book } from '../../../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit { 
  allBooks: Book[] = [];
  books: Book[] = [];
  searchText: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.allBooks = data ?? [];
      this.books = data ?? [];
    });
  }

  filterBooks(): void {
    const keyword = this.searchText?.toLowerCase() || '';
    if (!keyword) {
      this.books = this.allBooks;
      return;
    }

    this.books = this.allBooks.filter(b =>
      (b.title || '').toLowerCase().includes(keyword) ||
      (b.author || '').toLowerCase().includes(keyword) ||
      (b.category || '').toLowerCase().includes(keyword) ||
      (b.subCategory || '').toLowerCase().includes(keyword)
    );
  }

  deleteBook(id: number) {
    if (confirm('Are you sure?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }

  editBook(id: number) {
    this.router.navigate(['/admin/books/edit', id]);
  }

  addBook() {
    this.router.navigate(['/admin/books/add']);
  }

  trackById(index: number, book: Book): number {
    return book.id!;
  }
  borrowBook(book: Book) {
  this.router.navigate(['/admin/transactions/add'], { queryParams: { bookId: book.id } });
}

}
