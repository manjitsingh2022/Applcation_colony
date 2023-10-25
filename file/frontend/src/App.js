import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Profile from './components/Profile';
import BoardAdmin from './components/BoardAdmin';
import { House, Maintenance, Notice, User } from './pages/admin';
import Login from './components/Login';
// import Register from './components/Register';
import NotFound from './pages/NotFound';
import Layout from './layoutHandle/Layout';

import { useSelector } from 'react-redux';
import BoardUser from './components/BoardUser';
import { Contact, Event, Homecomponent, MaintenanceRequestCard, Notices } from './pages/home';
const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Router >
      <Routes>
        {isLoggedIn && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Homecomponent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<BoardUser />} />
            <Route path="user/request" element={<MaintenanceRequestCard />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/event" element={<Event />} />
            <Route path="admin">
              <Route index path="users" element={<BoardAdmin />} />
              <Route path="house" element={<House />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="notices" element={<Notice />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>

        )}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </>
        )}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
