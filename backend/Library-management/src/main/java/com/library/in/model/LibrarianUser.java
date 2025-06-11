package com.example.library.model;

import jakarta.persistence.*;

@Entity
public class LibrarianUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

	public Object getName() {
		// TODO Auto-generated method stub
		return null;
	}

    // Getters and setters
}
