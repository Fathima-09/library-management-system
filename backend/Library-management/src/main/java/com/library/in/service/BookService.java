package com.library.in.service;

import com.library.in.model.Book;
import com.library.in.model.Transaction;
import com.library.in.model.User;
import com.library.in.repository.BookRepository;
import com.library.in.repository.TransactionRepository;
import com.library.in.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public List<Book> getAvailableBooks() {
        return bookRepo.findByAvailable(true);
    }

    public String borrowBook(Long userId, Long bookId) {
        Book book = bookRepo.findById(bookId).orElse(null);
        if (book == null) return "Book not found";
        if (!book.isAvailable()) return "Book is already borrowed";

        User user = userRepo.findById(userId).orElse(null);
        if (user == null) return "User not found";

        int activeBorrowCount = transactionRepo.countByUserIdAndReturnedFalse(userId);
        if (activeBorrowCount >= 5) {
            return "You can borrow a maximum of 5 books at a time.";
        }

        book.setAvailable(false);
        bookRepo.save(book);

        Transaction txn = new Transaction();
        txn.setUserId(userId);
        txn.setBookId(bookId);
        txn.setTitle(book.getTitle());
        txn.setBorrowDate(LocalDate.now());
        txn.setDueDate(LocalDate.now().plusDays(10));
        txn.setReturned(false);

        transactionRepo.save(txn);

        return "Book borrowed successfully!";
    }

    public List<Book> searchBooks(String query) {
        if (query == null || query.isBlank()) {
            return bookRepo.findAll();
        }
        return bookRepo.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }
}
