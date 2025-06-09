package com.library.in.controller;

import com.library.in.model.RegisterModel; // ✅ Fixed import
import com.library.in.service.RegisterService; // ✅ Fixed import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    @Autowired
    private RegisterService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterModel user) {
        boolean success = authService.register(user);
        if (success) {
            return "Registration successful";
        } else {
            throw new RuntimeException("Email already registered");
        }
    }
}
