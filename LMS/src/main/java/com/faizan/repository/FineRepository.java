package com.faizan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.faizan.entities.Fine;

public interface FineRepository extends JpaRepository<Fine, Long> {
	long countByStatus(String status);
}
