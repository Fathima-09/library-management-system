package com.library.in.controller;

import com.library.in.model.User;
import com.library.in.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getProfile(@PathVariable Long id) {
        return userService.getUserProfile(id);
    }

    @PutMapping("/{id}")
    public User updateProfile(@PathVariable Long id, @RequestBody User updated) {
        return userService.updateUserProfile(id, updated);
    }
}
