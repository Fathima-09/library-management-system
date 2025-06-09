package com.library.in.repository;

import com.library.in.model.OtpVerificationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpVerificationRepository extends JpaRepository<OtpVerificationModel, Long> {
    Optional<OtpVerificationModel> findTopByEmailOrderByCreatedAtDesc(String email);
}
