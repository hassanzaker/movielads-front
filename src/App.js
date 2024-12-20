import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';  // Import Home component
import Dashboard from './components/pages/Dashboard';
import axios from 'axios';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';

import { Container } from 'react-bootstrap';
import MovieView from './components/pages/MovieView';
import MovieList from './components/pages/MovieList';
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';
import Watchlist from './components/pages/Watchlist';
import Seenlist from './components/pages/Seenlist';
import Profile from './components/pages/Profile';
import LandingPage from './components/pages/LandingPage';
import Presentaions from './components/pages/Presentations';
import Classifier from './components/pages/Classifier';
import Settings from './components/pages/Setting';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuth } from './components/AuthContext';
import { useTheme, ThemeProvider } from './components/ThemeContext';
import ChangePassword from './components/pages/ChangePassword';
import Presentations from './components/pages/Presentations';

// axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.baseURL = 'https://api.movielads.net/';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post('users/refresh/', {
      refresh: refreshToken,
    });
    const { access } = response.data;
    localStorage.setItem('accessToken', access);  // Update new access token
    return access;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};

// Axios request interceptor to add the Authorization header
axios.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken');

    // Check if the token has expired (this is a simplified check)
    const tokenExpired = false;  // Add your logic for checking token expiration

    // Refresh the token if it's expired
    if (tokenExpired) {
      token = await refreshToken();
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor to handle 401 errors (Unauthorized)
axios.interceptors.response.use(
  (response) => response,  // Pass through valid responses
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 error (token expired), try refreshing the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);  // Retry the original request with the new token
      }
    }

    return Promise.reject(error);  // Reject all other errors
  }
);


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};


const AppContent = () => {
  const location = useLocation();




  if (location.pathname === '/classifier' || location.pathname === '/classifier/') {
    // Isolated route for Classifier
    return <Classifier />;
  }

  return (

    <AuthProvider>
      <DndProvider backend={HTML5Backend}>

          <NavigationBar  />
          <div className="content">
            <Container>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />  {/* Home route */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/movies/:movieId" element={<MovieView />} />
                <Route path="/movies" element={<MovieList />} />
                <Route path="/about" element={<About />} />
                <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
                <Route path="/seenlist" element={<ProtectedRoute><Seenlist /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/presentations" element={<Presentations />} />
                {/* Catch-all route for undefined URLs */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </div>
          <Footer />
      </DndProvider>
    </AuthProvider>
  );
};



const App = () => {
  const { theme } = useTheme();


  useEffect(() => {
    // Set the document title
    document.title = "MovieLads";

    // Remove any previous theme class from the body
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-solarized', 'theme-autumn', 'theme-forest', 'theme-midnight', 'theme-ocean', 'theme-pastel', 'theme-sunset', 'theme-vintage', 'theme-lavender');

    // Add the new theme class based on the selected theme
    document.body.classList.add(`theme-${theme}`);

    // Save the theme to localStorage for persistence
    localStorage.setItem('theme', theme);

    // Load Google Fonts if needed (optional)
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

  }, [theme]);

  
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );

};

export default App;
