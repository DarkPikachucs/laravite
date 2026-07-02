import './bootstrap';
import '../css/app.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
//import './styles/app.css'; // import global styles (Tailwind หรือ custom CSS)

const root = document.getElementById('app');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
