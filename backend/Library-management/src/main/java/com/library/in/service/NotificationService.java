package com.library.in.service;

import com.library.in.dto.NotificationDTO;
import com.library.in.model.Transaction;
import com.library.in.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private TransactionRepository transactionRepo;

    public List<NotificationDTO> getMemberNotifications(Long userId) {
        List<Transaction> txns = transactionRepo.findByUserIdAndReturnedFalse(userId);
        List<NotificationDTO> alerts = new ArrayList<>();
        LocalDate now = LocalDate.now();

        for (Transaction txn : txns) {
            String title = txn.getTitle();
            LocalDate dueDate = txn.getDueDate();

            if (dueDate.isBefore(now)) {
                alerts.add(new NotificationDTO("overdue", "Book '" + title + "' is overdue."));
            } else {
                alerts.add(new NotificationDTO("due", "Book '" + title + "' is due by " + dueDate));
            }
        }

        return alerts;
    }
}
