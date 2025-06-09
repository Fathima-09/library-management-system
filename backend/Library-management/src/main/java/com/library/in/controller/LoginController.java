package com.library.in.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.library.in.model.RegisterModel;  // fixed import path
import com.library.in.service.LoginService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService authService;

    static class LoginRequest {
        public String email;
        public String password;
    }

    static class LoginResponse {
        public Long id;
        public String role;
        public String email;

        public LoginResponse(RegisterModel user) {
            this.id = user.getId();
            this.role = user.getRole();
            this.email = user.getEmail();
        }
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        RegisterModel user = authService.login(request.email, request.password);
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse(user);
    }
}
