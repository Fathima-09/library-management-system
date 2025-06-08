package com.library.in.controller;

import com.library.in.model.Transaction;
import com.library.in.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member/history")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{userId}")
    public List<Transaction> getHistory(@PathVariable Long userId) {
        return transactionService.getHistoryByUser(userId);
    }
    
    @PostMapping("/return")
    public String returnBook(@RequestParam Long userId, @RequestParam Long bookId) {
        return transactionService.returnBook(userId, bookId);
    }

}
