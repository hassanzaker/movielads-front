import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import LandingPage from './components/pages/LandingPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

axios.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => Promise.reject(error)
);



const App = () => {

  useEffect(() => {
    // Define the name of web app
    document.title = "MovieLads";


    // Load font from google fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);


    return (
        <AuthProvider>
            <DndProvider backend={HTML5Backend}>

                <Router>
                    <NavigationBar/>
                    <div className="content">
                        <Container>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/signin" element={<Signin />} />
                                <Route path="/home" element={<Home />} />  {/* Home route */}
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/movies/:movieId" element={<MovieView />} />
                                <Route path="/movies" element={<MovieList />} />
                                <Route path="/about" element={<About />} />

                                {/* Catch-all route for undefined URLs */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Container>
                    </div>
                    <Footer />
                </Router>
            </DndProvider>
        </AuthProvider>
    );
};

export default App;
