MovieLads Frontend
Welcome to the MovieLads Frontend repository! This is the frontend codebase for the MovieLads application, a movie-centric web platform that allows users to search, rate, and discuss their favorite movies. It also offers movie recommendations, trivia games, and personalized user experiences. The frontend is built with React and deployed on AWS Amplify, connecting to a Django-based backend through Axios for API communication.

Table of Contents
Overview
Features
Tech Stack
Prerequisites
Installation
Configuration
Running the Project
Deployment
Project Structure
API Integration
Contributing
License
Overview
The MovieLads frontend is designed to offer a seamless and interactive user experience for movie enthusiasts. It connects with a backend API to provide dynamic data and handles authentication using JWT. The frontend application is hosted on AWS Amplify with continuous deployment from the GitHub repository.

Features
User Authentication: Secure login and signup functionality using JWT.
Movie Search & Discovery: Find movies using the search bar and add them to a watchlist.
Personalized Recommendations: Get movie recommendations based on user preferences.
User Interaction: Comment on movies, chat with friends, and share thoughts.
Trivia Games: Engage with fun movie trivia games.
Responsive Design: Optimized for both desktop and mobile users.
Tech Stack
Frontend: React, React Router, React-Bootstrap
State Management: Context API (for user authentication and session management)
HTTP Client: Axios (for making API requests)
Styling: CSS, Bootstrap
Hosting & Deployment: AWS Amplify (with CI/CD)
Version Control: GitHub
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm: Make sure Node.js (v14 or later) and npm are installed on your machine. Download Node.js.
Git: You should have Git installed to clone the repository. Download Git.
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/hassanzaker/movielads-front.git
cd movielads-front
Install dependencies:

bash
Copy code
npm install
Create an environment file: Add an .env file at the root with the following variables:

javascript
Copy code
REACT_APP_API_BASE_URL=<Your Backend API Base URL>
Configuration
The frontend interacts with the backend using Axios. Configure the base URL for API requests in the .env file.

Backend API: Set the REACT_APP_API_BASE_URL to the URL of your backend server (e.g., https://api.movielads.net).
Running the Project
To run the project locally, execute:

bash
Copy code
npm start
The development server will start, and the app will be available at http://localhost:3000.

Scripts
Start Development Server: npm start
Build for Production: npm run build
Lint Code: npm run lint
Deployment
This project is deployed using AWS Amplify, which allows for automatic deployments when code is pushed to the GitHub repository.

Steps to Deploy on AWS Amplify
Connect the Repository: Go to AWS Amplify in the AWS Console, connect your GitHub repository, and select the appropriate branch.
Configure Build Settings: Use the default build settings or modify the amplify.yml file if needed.
Deploy: AWS Amplify will automatically build and deploy your application upon code changes.
Project Structure
bash
Copy code
movielads-front/
│
├── public/               # Static files (index.html, manifest, favicon)
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable components (buttons, cards, forms)
│   ├── pages/            # Page components (LandingPage, Movies, Signin, Signup)
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point for React
│   ├── index.css         # Global styles
│   ├── context/          # Context for authentication and state management
│   └── utils/            # Utility functions and API service configuration
└── .env                  # Environment variables (ignored in git)
API Integration
Axios Configuration
Axios is used for making HTTP requests to the backend. The Axios instance is configured with an interceptor to include the JWT token in the Authorization header:

js
Copy code
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
Example API Call
js
Copy code
// Fetch movies
API.get('/movies')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error fetching movies:', error);
  });
Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
License
This project is open-source and available under the MIT License.

