package com.faizan.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.faizan.entities.LoginRequest;
import com.faizan.repository.BookRepository;
import com.faizan.repository.FineRepository;
import com.faizan.repository.TransactionRepository;
import com.faizan.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
	
	@Autowired
	private  BookRepository bookRepository;
	@Autowired
    private  UserRepository userRepository;
	@Autowired
    private  TransactionRepository transactionRepository;
	@Autowired
    private  FineRepository fineRepository;

    private final String ADMIN_USERNAME = "faizz";
    private final String ADMIN_PASSWORD = "1234";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (ADMIN_USERNAME.equals(request.getUsername()) && ADMIN_PASSWORD.equals(request.getPassword())) {
           
            String token = "ADMIN-TOKEN-123";
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalBooks", bookRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("borrowedBooks", transactionRepository.countByStatus("Borrowed"));
        stats.put("overdueBooks", transactionRepository.countByStatus("Overdue"));
        stats.put("unpaidFines", fineRepository.countByStatus("UNPAID"));
        return ResponseEntity.ok(stats);
    }
}

