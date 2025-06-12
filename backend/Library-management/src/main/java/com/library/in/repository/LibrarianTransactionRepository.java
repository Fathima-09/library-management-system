package com.example.library.repository;

import com.example.library.model.LibrarianTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibrarianTransactionRepository extends JpaRepository<LibrarianTransaction, Long> {
}
