import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './layouts/Header';
// import dotenv from 'dotenv';

// dotenv.config();

ReactDOM.createRoot(
  document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);
