package com.faizan.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;
    private String category;
    private String subCategory;
    private int year;
    private int noOfCopies;
    
    @Lob
    private String imageUrl;

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public int getNoOfCopies() { return noOfCopies; }
    public void setNoOfCopies(int noOfCopies) { this.noOfCopies = noOfCopies; }
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Book(String title, String author, String isbn, String category, String subCategory, int year, int noOfCopies,
			String imageUrl) {
		super();
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.category = category;
		this.subCategory = subCategory;
		this.year = year;
		this.noOfCopies = noOfCopies;
		this.imageUrl = imageUrl;
	}
    
    
}


