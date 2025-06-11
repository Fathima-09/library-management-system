package com.library.in.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.in.model.AdminUser;

import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByEmail(String email);
}
