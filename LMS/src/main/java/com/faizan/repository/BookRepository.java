package com.faizan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.faizan.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
