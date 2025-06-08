package com.library.in.service;

import com.library.in.model.User;
import com.library.in.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public User getUserProfile(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public User updateUserProfile(Long id, User updated) {
        User user = userRepo.findById(id).orElseThrow();
        user.setName(updated.getName());
        user.setEmail(updated.getEmail());
        user.setPhone(updated.getPhone());
        user.setAddress(updated.getAddress());
        user.setProfilePic(updated.getProfilePic());
        return userRepo.save(user);
    }
}
