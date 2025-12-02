// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        {/* The dynamic route based on the slug */}
        <Route path="/products/:slug" element={<ProductPage />} />
        {/* Optional: Add a placeholder home route if needed */}
        <Route path="/" element={<h1>Welcome to Fix Buddy!</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);