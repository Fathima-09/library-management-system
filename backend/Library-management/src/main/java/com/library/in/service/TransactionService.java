package com.library.in.service;

import com.library.in.model.Book;
import com.library.in.model.Transaction;
import com.library.in.repository.BookRepository;
import com.library.in.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private BookRepository bookRepo;

    public List<Transaction> getHistoryByUser(Long userId) {
        return transactionRepo.findByUserIdOrderByBorrowDateDesc(userId);
    }

    public String returnBook(Long userId, Long bookId) {
        List<Transaction> txns = transactionRepo.findByUserIdAndBookIdAndReturnedFalse(userId, bookId);
        if (txns.isEmpty()) return "No active transaction found.";

        Transaction txn = txns.get(0);
        txn.setReturnedDate(LocalDate.now());
        txn.setReturned(true);
        transactionRepo.save(txn);

        Book book = bookRepo.findById(bookId).orElse(null);
        if (book != null) {
            book.setAvailable(true);
            bookRepo.save(book);
        }

        return "Book returned successfully!";
    }
}
