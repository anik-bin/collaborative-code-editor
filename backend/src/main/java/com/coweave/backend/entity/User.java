package com.coweave.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity // this class represents a database table
@Table(name = "users")
@Data

public class User {
    @Id  // marks the id field as primary key in the table
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tells the database to automatically generate and increment id
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
}
