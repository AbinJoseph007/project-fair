import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import Contexts from './contexts/Contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Contexts>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Contexts>
  </React.StrictMode>
);

