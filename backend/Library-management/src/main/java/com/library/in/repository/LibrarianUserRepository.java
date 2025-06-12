package com.example.library.repository;

import com.example.library.model.LibrarianUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibrarianUserRepository extends JpaRepository<LibrarianUser, Long> {
}
