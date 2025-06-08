package com.library.in.controller;

import com.library.in.dto.NotificationDTO;
import com.library.in.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<NotificationDTO> getNotifications(@PathVariable Long userId) {
        return notificationService.getMemberNotifications(userId);
    }
}
