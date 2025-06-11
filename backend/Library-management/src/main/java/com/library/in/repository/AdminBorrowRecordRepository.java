package com.library.in.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.in.model.AdminBorrowRecord;

public interface AdminBorrowRecordRepository extends JpaRepository<AdminBorrowRecord, Long> {
    // You can add methods like findByUserId, findByBookId if needed
}
