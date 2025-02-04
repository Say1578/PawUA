import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router> 
    <CartProvider>
      <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);