import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import Register from "./Register";
import Login from "./Login";


const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
};


export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);