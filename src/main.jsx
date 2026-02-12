import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

try {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
} catch (e) {
    console.error("Mounting error:", e);
    const mountError = document.createElement('div');
    mountError.style.color = 'red';
    mountError.style.padding = '20px';
    mountError.textContent = `Mount Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    document.body.appendChild(mountError);
}
