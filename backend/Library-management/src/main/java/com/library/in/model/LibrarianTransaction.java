package com.example.library.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class LibrarianTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookTitle;
    private String userName;
    private String type; // "Issued" or "Returned"

    @Temporal(TemporalType.DATE)
    private Date date;

	public void setBookTitle(Object title) {
		// TODO Auto-generated method stub
		
	}

	public void setUserName(Object name) {
		// TODO Auto-generated method stub
		
	}

	public void setType(String string) {
		// TODO Auto-generated method stub
		
	}

	public void setDate(Date date2) {
		// TODO Auto-generated method stub
		
	}

    // Getters and setters
}
