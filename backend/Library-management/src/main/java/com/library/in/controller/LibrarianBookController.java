package com.example.library.controller;

import com.example.library.model.LibrarianBook;
import com.example.library.service.LibrarianBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class LibrarianBookController {

    @Autowired
    private LibrarianBookService bookService;

    // Get all books
    @GetMapping
    public List<LibrarianBook> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<LibrarianBook> getBookById(@PathVariable Long id) {
        Optional<LibrarianBook> book = bookService.getBookById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add new book
    @PostMapping
    public LibrarianBook createBook(@RequestBody LibrarianBook book) {
        return bookService.createBook(book);
    }

    // Update existing book
    @PutMapping("/{id}")
    public LibrarianBook updateBook(@PathVariable Long id, @RequestBody LibrarianBook book) {
        return bookService.updateBook(id, book);
    }

    // Delete book by ID
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book with ID " + id + " deleted successfully.";
    }
}
