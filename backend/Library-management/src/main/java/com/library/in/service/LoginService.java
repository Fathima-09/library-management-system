package com.library.in.service;

import com.library.in.model.RegisterModel; // ✅ Corrected import
import com.library.in.repository.RegisterRepository; // ✅ Corrected import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private RegisterRepository userRepository;

    public RegisterModel login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)) // in prod, hash passwords
                .orElse(null);
    }
}
