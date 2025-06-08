package com.library.in.repository;

import com.library.in.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserIdOrderByBorrowDateDesc(Long userId);

    List<Transaction> findByUserIdAndBookIdAndReturnedFalse(Long userId, Long bookId);

    List<Transaction> findByUserIdAndReturnedFalse(Long userId);

    int countByUserIdAndReturnedFalse(Long userId);
}
