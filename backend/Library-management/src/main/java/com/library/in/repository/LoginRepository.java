package com.library.in.repository;

import com.library.in.model.LoginModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<LoginModel, Long> {
    Optional<LoginModel> findByEmail(String email);
}