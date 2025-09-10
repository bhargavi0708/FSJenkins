import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config.js";
import "./style.css";

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState({ name: "", status: "pending" });
  const [message, setMessage] = useState("");

  const baseUrl = `${config.url}/habits`;

  useEffect(() => {
    fetchHabits();
  }, []);

  // Fetch all habits -> GET /habits/all
  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setHabits(res.data);
    } catch {
      setMessage("Failed to fetch habits.");
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  // Add habit -> POST /habits/add
  const addHabit = async () => {
    if (!habit.name.trim()) {
      setMessage("Habit name cannot be empty.");
      return;
    }
    try {
      await axios.post(`${baseUrl}/add`, habit);
      setMessage("Habit added successfully.");
      fetchHabits();
      setHabit({ name: "", status: "pending" });
    } catch {
      setMessage("Error adding habit.");
    }
  };

  // Mark habit as done -> PUT /habits/update/{id}
  const markDone = async (id) => {
    try {
      await axios.put(`${baseUrl}/update/${id}`, { status: "done" });
      setMessage("Habit marked as done.");
      fetchHabits();
    } catch {
      setMessage("Error updating habit.");
    }
  };

  // Delete habit -> DELETE /habits/delete/{id}
  const deleteHabit = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage("Habit deleted.");
      fetchHabits();
    } catch {
      setMessage("Error deleting habit.");
    }
  };

  return (
    <div className="data-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>Habit Tracker</h2>

      {/* Add Habit Form */}
      <div>
        <h3>Add Habit</h3>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Habit name"
            value={habit.name}
            onChange={handleChange}
          />
        </div>
        <button className="btn-blue" onClick={addHabit}>
          Add Habit
        </button>
      </div>

      {/* All Habits */}
      <div>
        <h3>All Habits</h3>
        {habits.length === 0 ? (
          <p>No habits found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Habit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((h) => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.name}</td>
                    <td>{h.status}</td>
                    <td>
                      {h.status !== "done" && (
                        <button
                          className="btn-green"
                          onClick={() => markDone(h.id)}
                        >
                          Mark Done
                        </button>
                      )}
                      <button
                        className="btn-red"
                        onClick={() => deleteHabit(h.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
