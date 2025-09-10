package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Habit;
import com.example.demo.repository.HabitRepository;

@Service
public class HabitServiceImpl implements HabitService {

    @Autowired
    private HabitRepository habitRepository;

    @Override
    public Habit addHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    @Override
    public Habit getHabitById(int id) {
        Optional<Habit> opt = habitRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Habit updateHabit(int id, Habit updatedHabit) {
        return habitRepository.findById(id).map(habit -> {
            habit.setName(updatedHabit.getName());
            habit.setStatus(updatedHabit.getStatus());
            return habitRepository.save(habit);
        }).orElse(null);
    }

    @Override
    public boolean deleteHabitById(int id) {
        if (habitRepository.existsById(id)) {
            habitRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
