package com.library.in.dto;

import java.time.LocalDate;

public class AdminTransactionDTO {

    private Long id;
    private String user;
    private String bookTitle;
    private LocalDate issueDate;
    private LocalDate returnDate;
    private String status;
    private double fine;

    public AdminTransactionDTO() {
    }

    public AdminTransactionDTO(Long id, String user, String bookTitle, LocalDate issueDate,
                          LocalDate returnDate, String status, double fine) {
        this.id = id;
        this.user = user;
        this.bookTitle = bookTitle;
        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.status = status;
        this.fine = fine;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getFine() {
        return fine;
    }

    public void setFine(double fine) {
        this.fine = fine;
    }
}
