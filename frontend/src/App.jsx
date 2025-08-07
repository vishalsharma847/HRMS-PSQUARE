import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Pages from './Pages';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
  let inactivityTimer;
  let refreshInterval;

  const refreshToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/admin/refresh-token', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const resetTimers = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      logout(); // user inactive for 2 hours
    }, 2 * 60 * 60 * 1000); // 2 hours

    clearInterval(refreshInterval);
    refreshInterval = setInterval(refreshToken, 15 * 60 * 1000); // refresh every 15 mins if active
  };

  // Listen to user events
  ['mousemove', 'keydown', 'click', 'scroll'].forEach(event =>
    window.addEventListener(event, resetTimers)
  );

  resetTimers(); // start timers

  return () => {
    clearTimeout(inactivityTimer);
    clearInterval(refreshInterval);
    ['mousemove', 'keydown', 'click', 'scroll'].forEach(event =>
      window.removeEventListener(event, resetTimers)
    );
  };
}, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Pages/>
    </Router>
  )
}

export default App