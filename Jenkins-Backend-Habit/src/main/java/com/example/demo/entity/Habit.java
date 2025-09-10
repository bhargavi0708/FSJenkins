package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "habit_table")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    @Column(name = "habit_id")
    private int id;

    @Column(name = "habit_name", nullable = false, length = 100)
    private String name;   // matches React's `habit.name`

    @Column(name = "habit_status", nullable = false, length = 20)
    private String status; // matches React's `habit.status`

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Habit [id=" + id + ", name=" + name + ", status=" + status + "]";
    }
}
