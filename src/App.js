// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom"; // Only import necessary components
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </div>
  );
};

export default App;
