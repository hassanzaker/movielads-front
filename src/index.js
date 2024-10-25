import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import { ThemeProvider } from './components/ThemeContext';

import './styles/theme-light.css';
import './styles/theme-dark.css';
import './styles/theme-solarized.css';
import './styles/theme-forest.css';
import './styles/theme-ocean.css';
import './styles/theme-sunset.css';
import './styles/theme-midnight.css';
import './styles/theme-autumn.css';
import './styles/theme-pastel.css';
import './styles/theme-vintage.css';
import './styles/theme-lavender.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
