package com.library.in.controller;

import com.library.in.model.Book;
import com.library.in.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    // 1. Get all available books
    @GetMapping("/books")
    public List<Book> getAvailableBooks() {
        return bookService.getAvailableBooks();
    }

    // 2. Borrow a book
    @PostMapping("/borrow")
    public String borrowBook(@RequestParam Long userId, @RequestParam Long bookId) {
        return bookService.borrowBook(userId, bookId);
    }

    // 3. Optional: search books if needed later
    @GetMapping("/books/search")
    public List<Book> searchBooks(@RequestParam(required = false) String query) {
        return bookService.searchBooks(query);
    }
}
