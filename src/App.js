import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Users } from './components/Users';
import { Transfers } from './components/Transfers';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <NavBar />}
      <div className="container p-2">
        <Routes>
          <Route
            path="/transfers"
            element={isAuthenticated ? <Transfers /> : <Login />}
          />

          <Route
            path="/users"
            element={isAuthenticated ? <Users /> : <Login />}
          />

          <Route path="/" element={isAuthenticated ? <Users /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
