import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './UserForm';
import Admin from './Admin';
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/user" element={<UserForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
