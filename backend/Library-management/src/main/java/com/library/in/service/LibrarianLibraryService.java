package com.example.library.service;

import com.example.library.model.*;
import com.example.library.repository.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LibrarianLibraryService {

    private final LibrarianBookRepository bookRepo;
    private final LibrarianUserRepository userRepo;
    private final LibrarianTransactionRepository transactionRepo;

    public LibrarianLibraryService(LibrarianBookRepository bookRepo, LibrarianUserRepository userRepo, LibrarianTransactionRepository transactionRepo) {
        this.bookRepo = bookRepo;
        this.userRepo = userRepo;
        this.transactionRepo = transactionRepo;
    }

    public LibrarianBook addBook(LibrarianBook book) {
        return bookRepo.save(book);
    }

    public List<LibrarianBook> getAllBooks() {
        return bookRepo.findAll();
    }

    public void deleteBook(Long id) {
        bookRepo.deleteById(id);
    }

    public LibrarianBook updateBook(Long id, LibrarianBook book) {
        book.setId(id);
        return bookRepo.save(book);
    }

    public LibrarianTransaction issueBook(Long bookId, Long userId) {
        LibrarianBook book = bookRepo.findById(bookId).orElseThrow();
        LibrarianUser user = userRepo.findById(userId).orElseThrow();

        if (!book.isAvailable()) throw new RuntimeException("Book is already issued");

        book.setAvailable(false);
        bookRepo.save(book);

        LibrarianTransaction tx = new LibrarianTransaction();
        tx.setBookTitle(book.getTitle());
        tx.setUserName(user.getName());
        tx.setType("Issued");
        tx.setDate(new Date());

        return transactionRepo.save(tx);
    }

    public LibrarianTransaction returnBook(Long bookId, Long userId) {
        LibrarianBook book = bookRepo.findById(bookId).orElseThrow();
        LibrarianUser user = userRepo.findById(userId).orElseThrow();

        if (book.isAvailable()) throw new RuntimeException("Book is not currently issued");

        book.setAvailable(true);
        bookRepo.save(book);

        LibrarianTransaction tx = new LibrarianTransaction();
        tx.setBookTitle(book.getTitle());
        tx.setUserName(user.getName());
        tx.setType("Returned");
        tx.setDate(new Date());

        return transactionRepo.save(tx);
    }

    public List<LibrarianTransaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    public List<LibrarianUser> getAllUsers() {
        return userRepo.findAll();
    }
}
