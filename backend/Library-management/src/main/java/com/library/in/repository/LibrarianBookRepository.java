package com.example.library.repository;

import com.example.library.model.LibrarianBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibrarianBookRepository extends JpaRepository<LibrarianBook, Long> {
    boolean existsByIsbn(String isbn);
}
