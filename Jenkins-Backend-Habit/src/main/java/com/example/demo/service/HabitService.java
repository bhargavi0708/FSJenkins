package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.Habit;

public interface HabitService {
    Habit addHabit(Habit habit);
    List<Habit> getAllHabits();
    Habit getHabitById(int id);   
    Habit updateHabit(int id, Habit habit);
    boolean deleteHabitById(int id);
}
