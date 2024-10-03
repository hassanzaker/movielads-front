import React, {useState} from 'react';
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

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"


function getCSRFToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith('csrftoken=')) {
              cookieValue = cookie.substring('csrftoken='.length);
              break;
          }
      }
  }
  return cookieValue;
}

axios.interceptors.request.use(config => {
  const token = getCSRFToken();
  if (token) {
      config.headers['X-CSRFToken'] = token;  // Set CSRF token in headers
  }
  return config;
});




const App = () => {




    return (
      <AuthProvider>
        <Router>
          <NavigationBar/>
          <div className="content">
            <Container>
              <Routes>
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/signin" element={<Signin />} />
                      <Route path="/home" element={<Home />} />  {/* Home route */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/movies/:movieId" element={<MovieView />} />
                      <Route path="/movies" element={<MovieList />} />




                      {/* Catch-all route for undefined URLs */}
                    <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    );
};

export default App;
