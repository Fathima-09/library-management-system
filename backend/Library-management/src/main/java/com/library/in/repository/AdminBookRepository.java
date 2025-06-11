package com.library.in.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.in.model.AdminBook;

public interface AdminBookRepository extends JpaRepository<AdminBook, Long> {
    // You can add custom queries if needed later (e.g., findByTitle, etc.)
}
