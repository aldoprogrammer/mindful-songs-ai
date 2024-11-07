import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import './index.css'
import { AldoAlertProvider } from 'aldo-alert';
import { AuthProvider } from './context/AuthContext.jsx';

// Service Worker Registration (Add this section)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(registration => {
      console.log('Service worker registered:', registration);
    })
    .catch(error => {
      console.error('Service worker registration failed:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AldoAlertProvider>
        <App />
      </AldoAlertProvider>
    </AuthProvider>
  </React.StrictMode>,
);
