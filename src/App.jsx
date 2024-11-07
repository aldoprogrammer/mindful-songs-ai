// App.js
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import GeminiTesting from './pages/GeminiTesting';
import Home from './pages/Home';
import { generateToken, messaging } from './config/firebase';
import { onMessage } from 'firebase/messaging';

function App() {
  // useEffect(() => {
  //   // Request permission for notifications on app load
  //   requestPermission();
  // }, []);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/test" element={<GeminiTesting />} />
      </Routes>
    </Router>
  );
}

export default App;
