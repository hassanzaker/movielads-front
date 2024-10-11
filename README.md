# MovieLads Frontend

Welcome to the **MovieLads** frontend repository! This project is a React-based web application that serves as the frontend for the MovieLads platform, allowing users to explore movies, add them to their watchlist, interact with other movie enthusiasts, and more.

## Table of Contents

- [MovieLads Frontend](#movielads-frontend)
  - [Features](#features)
  - [Live Demo](#live-demo)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Configuration](#configuration)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)


## Features

- **Search for Movies**: Find movies, get detailed information, and add them to your watchlist.
- **User Interaction**: Users can leave comments and engage in discussions about their favorite movies.
- **Personalized Recommendations**: Get suggestions on what to watch based on your interests.
- **Interactive Games**: Play trivia games related to movies and challenge your knowledge.
- **Authentication**: JWT-based authentication system to ensure secure access to user accounts.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Live Demo

Check out the live version of the application [here](https://movielads.net).

## Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- A **GitHub** account
- Basic knowledge of React and JavaScript

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hassanzaker/movielads-front.git
   cd movielads-front
2. **Install dependencies

   ```bash
   npm install

### Running the Application
3. **Start the development server:

   ```bash
   npm start
   
This will run the app in development mode. Open http://localhost:3000 to view it in the browser.
   

4. **Build for production:
   ```bash
   npm run build
   
This will create an optimized build of the application in the build folder.



## Configuration

To configure the frontend application for your environment, follow these steps:

1. **Environment Variables**:
   - Create a `.env` file in the root of your project.


2. **AWS Amplify**:
   - Set up an AWS Amplify project to host this React app by following these steps:
     - Go to the AWS Amplify console and click **Get Started** under **Deploy**.
     - Connect your GitHub repository and select your `movielads-front` repository.
     - Amplify will automatically detect the framework as React and create build settings.
     - Review the settings and click **Save and Deploy**.
     - The app will be deployed on an Amplify-provided domain, which you can later customize using AWS Route 53.

3. **Backend API Configuration**:
   - Make sure the backend is set up and hosted (on AWS EC2 or other services).
   - Ensure that CORS is properly configured in the backend to allow requests from your frontend's domain.
   - Update the `REACT_APP_API_BASE_URL` with the correct backend URL to enable communication between frontend and backend services.



## Project Structure


### Key Files and Directories:
- **`public/`**: Contains the public assets and the `index.html` file that serves as the entry point for the React app.
- **`src/`**: Contains all the source code, including components, pages, and styles.
- **`assets/`**: Holds static assets such as images and icons used throughout the app.
- **`components/`**: Contains reusable components like the `NavigationBar`, `Footer`, and the `AuthContext` for managing user authentication.
- **`pages/`**: Holds different page components like `LandingPage`, `Signup`, `Signin`, and `About`, which are mapped to different routes.
- **`App.js`**: The main component that manages routing between different pages.
- **`index.js`**: The entry point of the React application.
- **`index.css`**: Contains global styles applied throughout the app.
- **`.env`**: Stores environment variables like API URLs.
- **`package.json`**: Manages project dependencies and scripts for building and running the app.
- **`README.md`**: Documentation file for the project.




## Technologies Used

This project utilizes a variety of modern web technologies and tools to create a full-featured and responsive web application. Below is a list of the key technologies used:

- **React**: A JavaScript library for building user interfaces, used for creating reusable components and managing the application's state and routing.
- **React Router**: Handles client-side routing and navigation, enabling a single-page application experience.
- **Axios**: A promise-based HTTP client for making API requests to the backend server.
- **React Bootstrap**: Provides responsive design and pre-styled components for building a modern and user-friendly interface.
- **React DnD**: For implementing drag-and-drop functionality, enhancing user interaction.
- **Swiper**: A modern touch slider library for implementing the sliding functionality in the landing page.
- **JavaScript**: The primary programming language used for the frontend logic and user interactions.
- **HTML5 & CSS3**: For structuring and styling the UI components.
- **AWS Amplify**: Hosting and managing the frontend application, providing CI/CD pipelines for automatic deployment.
- **AWS S3**: Storing media files and assets, including user-uploaded images and other static files.
- **AWS Route 53**: Manages the domain and DNS routing for the application.
- **JWT Authentication**: Provides a secure and stateless way of handling user authentication.
- **Git & GitHub**: Version control system and repository for managing the source code and collaborating with others.

These technologies work together to create a scalable and maintainable web application, offering a seamless user experience.
