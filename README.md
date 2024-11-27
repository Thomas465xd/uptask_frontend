# UpTask - To-Do List Web App

UpTask is a powerful project and task management web app built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create accounts, manage projects, assign tasks to team members, and track progress all in one place. The app features robust user authentication with JWT, a task delegation system for project managers, and more.

## Features

- **User Accounts & Authentication**: Users can sign up, log in, and manage their accounts with features like JWT authentication and a "Forgot Password" functionality.
- **Project Management**: Users can create and manage projects, assign roles and tasks to different members of the project team.
- **Task Delegation**: Project managers can delegate tasks to team members, track their progress, and ensure the successful completion of each task.
- **Team Collaboration**: Assign specific roles to each user and assign tasks based on their roles within the project.
- **Progress Tracking**: Track overall project progress by monitoring completed and pending tasks.
- **Headless UI Components**: A user-friendly interface with Headless UI components for a seamless, accessible experience.
- **RESTful API**: Connects to a backend RESTful API to manage projects, tasks, and user-related operations.

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Headless UI
  - Axios
  - JWT Authentication
- **Backend** (for reference):
  - Node.js
  - Express
  - MongoDB (MERN stack)
  - JWT for Authentication
- **UI Framework**: TailwindCSS (with Headless UI components for accessibility)

## Installation

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/uptask-frontend.git
    cd uptask-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following:
    ```
    REACT_APP_API_URL=<YOUR_API_URL>
    ```

4. Run the app:
    ```bash
    npm start
    ```

### Backend Setup

1. Clone the backend repository (if not already set up):
    ```bash
    git clone https://github.com/Thomas465xd/uptask_backend.git
    cd uptask-backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Set up the MongoDB database connection and other environment variables in `.env`.

4. Start the backend server:
    ```bash
    npm start
    ```

## Usage

1. **Sign Up**: Create a new user account by entering an email and password.
2. **Login**: Use your credentials to log in and access your account.
3. **Create Projects**: Project managers can create new projects and assign tasks.
4. **Assign Roles & Tasks**: Project managers can assign roles to team members and delegate tasks to them.
5. **Track Progress**: Monitor the overall progress of the project by checking task completion.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Headless UI for accessible components
- The MERN stack for full-stack web development

---

**Made with ♥️ Thomas Schrödinger
