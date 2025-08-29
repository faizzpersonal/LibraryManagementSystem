import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../../../../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {
  book: Book = { title:'', author:'', isbn:'', category:'', subCategory:'', year:2024, noOfCopies:1 };

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBooks().subscribe((data: Book[]) => {
      const found = data.find(b => b.id === id);
      if(found) this.book = found;
    });
  }

  updateBook(): void {
    this.bookService.updateBook(this.book).subscribe(() => {
      this.router.navigate(['/admin/books']);
    });
  }
}
