package com.faizan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.faizan.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
