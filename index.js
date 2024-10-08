import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ApplicationForm from './appliForm';

console.log("Rendering ApplicationForm..."); // Add this to check if the file runs

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ApplicationForm />);
