import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Clear the loading overlay immediately when this script runs to prove JS execution
const overlay = document.getElementById('loading-overlay');
if (overlay) {
    overlay.innerHTML += '<br/><small style="color:white">React Script Loaded...</small>';
}

try {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
} catch (e) {
    console.error("Mounting error:", e);
    document.body.innerHTML += `<div style="color:red;padding:20px">Mount Error: ${e.message}</div>`;
}
