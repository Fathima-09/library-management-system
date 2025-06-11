package com.library.in.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class AdminBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    // Constructors
    public AdminBook() {}

    public AdminBook(String title, String author) {
        this.title = title;
        this.author = author;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}

