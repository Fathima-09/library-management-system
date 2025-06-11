package com.library.in.controller;

import com.library.in.dto.AdminTransactionDTO;
import com.library.in.dto.AdminUserDTO;
import com.library.in.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow React app to access these endpoints
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ✅ Test endpoint to confirm backend is up
    @GetMapping("/test")
    public String test() {
        return "✅ Backend working!";
    }

    // ✅ Get all users
    @GetMapping("/users")
    public List<AdminUserDTO> getAllUsers() {
        return adminService.getAllUsers();
    }

    // ✅ Update a user's role
    @PutMapping("/users/{id}/role")
    public void updateUserRole(@PathVariable Long id, @RequestBody String newRole) {
        adminService.updateUserRole(id, newRole);
    }

    // ✅ Get all transaction records
    @GetMapping("/book-monitoring")
    public List<AdminTransactionDTO> getAllTransactions() {
        return adminService.getAllTransactions();
    }

  
}


