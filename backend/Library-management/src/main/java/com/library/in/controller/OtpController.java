package com.library.in.controller;

import com.library.in.service.OtpService;  // ✅ Fixed import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = otpService.generateOtp();
        otpService.saveOtp(email, otp);
        otpService.sendOtpToEmail(email, otp);
        return "OTP sent successfully";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        boolean isValid = otpService.verifyOtp(email, otp);
        if (isValid) {
            return "OTP verified";
        } else {
            throw new RuntimeException("Invalid OTP");
        }
    }
}
