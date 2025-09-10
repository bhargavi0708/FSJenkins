package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Habit;

public interface HabitRepository extends JpaRepository<Habit, Integer> {
    
    // Optional custom finder (if you ever want to check by name instead of ID)
    Habit findByName(String name);
}
