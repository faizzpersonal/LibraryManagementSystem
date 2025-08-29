package com.faizan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.faizan.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	long countByStatus(String status);
}
