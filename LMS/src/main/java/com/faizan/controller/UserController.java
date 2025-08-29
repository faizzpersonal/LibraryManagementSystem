package com.faizan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.faizan.entities.User;
import com.faizan.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserRepository userRepository;
    
    @GetMapping
    public List<User> getUsers() { return userRepository.findAll(); }

    @PostMapping
    public User addUser(@RequestBody User user) { return userRepository.save(user); }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User existing = userRepository.findById(id).orElseThrow();
        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setPhone(user.getPhone());
        existing.setRole(user.getRole());
        return userRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) { userRepository.deleteById(id); }
}

