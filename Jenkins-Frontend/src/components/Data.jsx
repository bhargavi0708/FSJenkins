import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config.js";
import "./style.css";

const Data = () => {
  const [dataList, setDataList] = useState([]);
  const [data, setData] = useState({
    id: "",
    name: "",
    department: "",
    contact: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [message, setMessage] = useState("");

  const baseUrl = `${config.url}/data-api`;

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ Fetch all data
  const fetchAllData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setDataList(res.data);
    } catch (error) {
      setMessage("Failed to fetch data.");
    }
  };

  // ✅ Handle form change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Add data
  const addData = async () => {
    try {
      await axios.post(`${baseUrl}/add`, data);
      setMessage("Data added successfully.");
      fetchAllData();
      resetForm();
    } catch (error) {
      setMessage("Error adding data.");
    }
  };

  // ✅ Delete data
  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllData();
    } catch (error) {
      setMessage("Error deleting data.");
    }
  };

  // ✅ Get data by ID
  const getDataById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedData(res.data);
      setMessage("");
    } catch (error) {
      setFetchedData(null);
      setMessage("Data not found.");
    }
  };

  const resetForm = () => {
    setData({ id: "", name: "", department: "", contact: "" });
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

      <h2>Data Manager</h2>

      {/* Form */}
      <div>
        <h3>Add Data</h3>
        <div className="form-grid">
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={data.id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={data.department}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={data.contact}
            onChange={handleChange}
          />
        </div>
        <button className="btn-blue" onClick={addData}>
          Add Data
        </button>
      </div>

      {/* Fetch by ID */}
      <div>
        <h3>Get Data By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getDataById}>
          Fetch
        </button>

        {fetchedData && (
          <div>
            <h4>Data Found:</h4>
            <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All data */}
      <div>
        <h3>All Data</h3>
        {dataList.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.department}</td>
                    <td>{d.contact}</td>
                    <td>
                      <button
                        className="btn-red"
                        onClick={() => deleteData(d.id)}
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

export default Data;
