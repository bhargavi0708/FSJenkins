package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Habit;
import com.example.demo.service.HabitService;

@RestController
@RequestMapping("/habits")
@CrossOrigin(origins = "*") // allow all frontends (React etc.)
public class HabitController {

    @Autowired
    private HabitService habitService;

    
    @PostMapping("/add")
    public ResponseEntity<Habit> addHabit(@RequestBody Habit habit) {
        Habit savedHabit = habitService.addHabit(habit);
        return new ResponseEntity<>(savedHabit, HttpStatus.CREATED);
    }

   
    @GetMapping("/all")
    public ResponseEntity<List<Habit>> getAllHabits() {
        List<Habit> habits = habitService.getAllHabits();
        return new ResponseEntity<>(habits, HttpStatus.OK);
    }

    
    @GetMapping("/get/{id}")
    public ResponseEntity<Habit> getHabitById(@PathVariable int id) {
        Habit habit = habitService.getHabitById(id);
        if (habit != null) {
            return new ResponseEntity<>(habit, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

   
    @PutMapping("/update/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable int id, @RequestBody Habit updatedHabit) {
        Habit habit = habitService.updateHabit(id, updatedHabit);
        if (habit != null) {
            return new ResponseEntity<>(habit, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHabit(@PathVariable int id) {
        boolean deleted = habitService.deleteHabitById(id);
        if (deleted) {
            return new ResponseEntity<>("Habit with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Habit with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
