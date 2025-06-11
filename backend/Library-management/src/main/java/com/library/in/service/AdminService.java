package com.library.in.service;

import com.library.in.dto.AdminTransactionDTO;
import com.library.in.dto.AdminUserDTO;
import com.library.in.model.AdminBorrowRecord;
import com.library.in.model.AdminUser;
import com.library.in.repository.AdminBorrowRecordRepository;
import com.library.in.repository.AdminUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private AdminUserRepository userRepository;

    @Autowired
    private AdminBorrowRecordRepository borrowRecordRepository;

    // Get all users (for role management)
    public List<AdminUserDTO> getAllUsers() {
        List<AdminUser> users = userRepository.findAll();
        return users.stream().map(user -> new AdminUserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }

    // Update user role
    public void updateUserRole(Long userId, String newRole) {
        Optional<AdminUser> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            user.setRole(newRole);
            userRepository.save(user);
        }
    }

    // Get all borrow transactions (for monitoring)
    public List<AdminTransactionDTO> getAllTransactions() {
        List<AdminBorrowRecord> records = borrowRecordRepository.findAll();
        return records.stream().map(record -> new AdminTransactionDTO(
                record.getId(),
                record.getUser().getName(),
                record.getBook().getTitle(),
                record.getIssueDate(),
                record.getReturnDate(),
                record.getStatus(),
                record.getFine()
        )).collect(Collectors.toList());
    }
}
