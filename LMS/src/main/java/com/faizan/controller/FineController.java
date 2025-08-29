package com.faizan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.faizan.entities.Fine;
import com.faizan.repository.FineRepository;

import java.util.List;

@RestController
@RequestMapping("/api/fines")
@CrossOrigin(origins = "*")
public class FineController {
	
	@Autowired
    private FineRepository fineRepository;

    @GetMapping
    public List<Fine> getFines() {
        return fineRepository.findAll();
    }

    @PostMapping
    public Fine addFine(@RequestBody Fine fine) {
        return fineRepository.save(fine);
    }

    @PutMapping("/{id}")
    public Fine updateFine(@PathVariable Long id, @RequestBody Fine fine) {
        Fine existing = fineRepository.findById(id).orElseThrow();
        existing.setAmount(fine.getAmount());
        existing.setStatus(fine.getStatus());
        existing.setTransaction(fine.getTransaction());
        return fineRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteFine(@PathVariable Long id) {
        fineRepository.deleteById(id);
    }
}
