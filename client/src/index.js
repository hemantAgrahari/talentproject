import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GoogleOAuthProvider clientId='808229363356-4052j0r209757dj7li9p2te809aa25b0.apps.googleusercontent.com'>

      <App />

    </GoogleOAuthProvider>
  </>

);


