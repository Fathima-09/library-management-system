package com.library.in.repository;

import com.library.in.model.RegisterModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RegisterRepository extends JpaRepository<RegisterModel, Long> {
    Optional<RegisterModel> findByEmail(String email);
}
