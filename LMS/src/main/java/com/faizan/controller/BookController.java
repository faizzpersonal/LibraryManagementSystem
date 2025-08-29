package com.faizan.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.faizan.entities.Book;
import com.faizan.repository.BookRepository;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*") 
public class BookController {

	@Autowired
    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }
    

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        Book existing = bookRepository.findById(id).orElseThrow();
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        existing.setIsbn(book.getIsbn());
        existing.setCategory(book.getCategory());
        existing.setSubCategory(book.getSubCategory());
        existing.setYear(book.getYear());
        existing.setNoOfCopies(book.getNoOfCopies());
        existing.setImageUrl(book.getImageUrl());
        return bookRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadBookImage(@RequestParam("file") MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            String encoded = java.util.Base64.getEncoder().encodeToString(bytes);
            String mimeType = file.getContentType();
            String base64Url = "data:" + mimeType + ";base64," + encoded;
            return ResponseEntity.ok(base64Url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Could not upload file: " + e.getMessage());
        }
    }


}

