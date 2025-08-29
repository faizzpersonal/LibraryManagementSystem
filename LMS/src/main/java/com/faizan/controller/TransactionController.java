package com.faizan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.faizan.entities.Book;
import com.faizan.entities.Fine;
import com.faizan.entities.Transaction;
import com.faizan.repository.BookRepository;
import com.faizan.repository.FineRepository;
import com.faizan.repository.TransactionRepository;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

	@Autowired
    private TransactionRepository transactionRepository;
	
	@Autowired
    private FineRepository fineRepository;

	@Autowired
    private BookRepository bookRepository;
	
	@GetMapping
    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Transaction t : transactions) {
            if (t.getReturnDate() == null && t.getDueDate().isBefore(today)) {
                t.setStatus("OVERDUE");
                transactionRepository.save(t);
            }
        }

        return transactions;
    }


    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
    	Book book = bookRepository.findById(transaction.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getNoOfCopies() <= 0) {
            throw new RuntimeException("No copies available for this book");
        }

        book.setNoOfCopies(book.getNoOfCopies() - 1);
        bookRepository.save(book);
        
        transaction.setStatus("BORROWED");
        return transactionRepository.save(transaction);
    }


    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        existing.setBorrowDate(transaction.getBorrowDate());
        existing.setDueDate(transaction.getDueDate());
        existing.setReturnDate(transaction.getReturnDate());

        if (existing.getReturnDate() != null) {
            existing.setStatus("RETURNED");
        } else if (existing.getDueDate().isBefore(LocalDate.now())) {
            existing.setStatus("OVERDUE");
        } else {
            existing.setStatus("BORROWED");
        }

        return transactionRepository.save(existing);
    }
    @PutMapping("/{id}/return")
    public ResponseEntity<Transaction> returnBook(@PathVariable Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setReturnDate(LocalDate.now());
        transaction.setStatus("Returned");
        
        Book book = transaction.getBook();
        book.setNoOfCopies(book.getNoOfCopies() + 1);
        bookRepository.save(book);

        if (transaction.getReturnDate().isAfter(transaction.getDueDate())) {
            long daysLate = ChronoUnit.DAYS.between(transaction.getDueDate(), transaction.getReturnDate());
            double fineAmount = daysLate * 50.0;

            Fine fine = new Fine();
            fine.setTransaction(transaction);
            fine.setAmount(fineAmount);
            fine.setStatus("UNPAID");

            fineRepository.save(fine);
        }

        transactionRepository.save(transaction);
        return ResponseEntity.ok(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionRepository.deleteById(id);
    }
}

