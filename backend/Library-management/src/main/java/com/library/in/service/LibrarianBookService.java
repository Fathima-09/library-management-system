package com.example.library.service;

import com.example.library.model.LibrarianBook;
import com.example.library.repository.LibrarianBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibrarianBookService {

    @Autowired
    private LibrarianBookRepository bookRepository;

    // Get all books
    public List<LibrarianBook> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get a book by id
    public Optional<LibrarianBook> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // Create a new book
    public LibrarianBook createBook(LibrarianBook book) {
        return bookRepository.save(book);
    }

    // Update a book
    public LibrarianBook updateBook(Long id, LibrarianBook updatedBook) {
        Optional<LibrarianBook> existingBookOpt = bookRepository.findById(id);
        if (existingBookOpt.isPresent()) {
            LibrarianBook existingBook = existingBookOpt.get();
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setIsbn(updatedBook.getIsbn());
            existingBook.setAvailable(updatedBook.isAvailable());
            return bookRepository.save(existingBook);
        }
        return null;
    }

    // Delete a book by id
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
