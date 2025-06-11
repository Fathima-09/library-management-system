package com.example.library.controller;

import com.example.library.model.LibrarianTransaction;
import com.example.library.model.LibrarianUser;
import com.example.library.service.LibrarianLibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LibrarianTransactionController {

    private final LibrarianLibraryService service;

    public LibrarianTransactionController(LibrarianLibraryService service) {
        this.service = service;
    }

    @PostMapping("/issue")
    public LibrarianTransaction issueBook(@RequestParam Long bookId, @RequestParam Long userId) {
        return service.issueBook(bookId, userId);
    }

    @PostMapping("/return")
    public LibrarianTransaction returnBook(@RequestParam Long bookId, @RequestParam Long userId) {
        return service.returnBook(bookId, userId);
    }

    @GetMapping("/transactions")
    public List<LibrarianTransaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    @GetMapping("/users")
    public List<LibrarianUser> getAllUsers() {
        return service.getAllUsers();
    }
}
