# URL Shortener Application

This application consists of a frontend (React) and a backend (Node.js + Express) for a URL shortener service.

## Setup Instructions

Follow the steps below to set up both the frontend and backend:

### 1. Frontend (React)

The frontend is located in the main directory.

Steps:

Start the frontend:
npm start

This command runs the React app in development mode. Open http://localhost:3000 in your browser to view the app.

### 2. Backend (Node.js + Express)

The backend is located in the `url-shortener-backend` folder. It provides the API endpoints for URL shortening and redirection.

Steps:

1. Navigate to the backend folder:
   cd url-shortener-backend

2. Install dependencies:
   npm install

3. Start the backend:
   node index.js

## Available Scripts

### Frontend Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production in the `build` folder.
- `npm run eject`: Ejects from the Create React App setup for full control.

### Backend Scripts

- `node index.js`: Starts the backend server.
- You may also install Nodemon to automatically restart the backend when code changes:
  npm install -g nodemon
  nodemon index.js

## Folder Structure

<project-directory>/
├── .env # Environment variables for frontend
├── README.md # Documentation
├── node_modules/ # Node dependencies for frontend
├── public/ # Public files for frontend
├── src/ # Source code for frontend
├── package.json # Frontend dependencies
├── url-shortener-backend/ # Backend folder
│ ├── .env # Environment variables for backend
│ ├── index.js # Backend entry file
│ ├── package.json # Backend dependencies
│ ├── node_modules/ # Node dependencies for backend
│ ├── models/ # Mongoose models for backend
│ ├── routes/ # Express routes for backend
│ └── controllers/ # Controller functions for backend
└── .gitignore # Files and folders to ignore in git

With this setup, you can start both the frontend and backend servers and begin testing and developing your URL shortener application.
