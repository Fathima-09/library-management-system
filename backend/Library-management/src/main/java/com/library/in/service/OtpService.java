package com.library.in.service;

import com.library.in.model.OtpVerificationModel;  // ✅ Fixed import
import com.library.in.repository.OtpVerificationRepository;  // ✅ Fixed import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpVerificationRepository otpRepo;

    public String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    public void sendOtpToEmail(String email, String otp) {
        System.out.printf("Sending OTP %s to email: %s%n", otp, email);
    }

    public void saveOtp(String email, String otp) {
        OtpVerificationModel record = new OtpVerificationModel();
        record.setEmail(email);
        record.setOtp(otp);
        otpRepo.save(record);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<OtpVerificationModel> latest = otpRepo.findTopByEmailOrderByCreatedAtDesc(email);
        return latest.isPresent() && latest.get().getOtp().equals(otp);
    }
}
