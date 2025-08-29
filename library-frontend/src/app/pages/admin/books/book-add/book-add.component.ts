import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService, Book } from '../../../../services/book.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html'
})
export class BookAddComponent {
  newBook: Book = { title:'', author:'', isbn:'', category:'', subCategory:'', year:2024, noOfCopies:1 };

  constructor(private bookService: BookService, private router: Router, private http: HttpClient) {}

  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.router.navigate(['/admin/books']);
    });
  }
  onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://localhost:8080/api/books/upload', formData, { responseType: 'text' })
      .subscribe((base64Url: string) => {
        this.newBook.imageUrl = base64Url; // set returned URL
      }, err => {
        alert('Upload failed');
      });
  }
}

}
