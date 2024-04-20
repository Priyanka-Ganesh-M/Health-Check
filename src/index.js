import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {AuthContextProvider} from './Context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <App/>
  </AuthContextProvider>
  </React.StrictMode>
);
