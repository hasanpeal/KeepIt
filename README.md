
# KeepIt - Todo List App

Welcome to KeepIt, a full-stack Todo List application built with Vite, React, TypeScript, and MongoDB. This application allows users to sign up, sign in, and manage their todo lists efficiently. The backend is powered by Express and MongoDB, ensuring robust performance and scalability.

## Project Structure

- **Frontend**: Built with Vite, React, TypeScript, and Tailwind CSS.
- **Backend**: Implemented with Express and MongoDB.
- **Authentication**: Simple email and password-based authentication.
- **Deployment**: Hosted on Render.

## Live Demo

The project is deployed and can be accessed [here](https://keepit-thuj.onrender.com/).

## Features

- User authentication (Sign up, Sign in).
- Create, read, and delete todos.
- Real-time updates to todo lists.
- Responsive design.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB instance running (can be local or MongoDB Atlas).

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/hasanpeal/Keepit.git
   cd Keepit
   ```

2. **Install frontend dependencies**:

   ```sh
   cd client
   npm install
   ```

3. **Install backend dependencies**:

   ```sh
   cd ../server
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory of the `server` folder and add the following environment variables:

```plaintext
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
```

### Running the Application

1. **Start the backend server**:

   ```sh
   cd server
   npm start
   ```

2. **Start the frontend development server**:

   ```sh
   cd ../client
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

### Sign Up

- Navigate to the Sign Up page.
- Enter your email and password to create an account.

### Sign In

- Navigate to the Sign In page.
- Enter your registered email and password to log in.

### Manage Todos

- After logging in, you can add new todos by entering text and clicking the "Add" button.
- Existing todos are displayed in a list where you can delete them by clicking the delete button.

## Project Structure

- `client`: Contains the React frontend code.
- `server`: Contains the Express backend code.
- `database`: MongoDB models and database connection.
- `services`: Business logic for user and todo operations.

## Technologies Used

- **Frontend**: Vite, React, TypeScript, Tailwind CSS.
- **Backend**: Express, MongoDB, Mongoose.
- **State Management**: React Hooks.
- **HTTP Client**: Axios.
- **Styling**: Tailwind CSS.
- **Icons**: Phosphor Icons.
- **Deployment**: Render.

## Contributing

We welcome contributions to improve this project! Here’s how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or suggestions, feel free to reach out via [GitHub Issues](https://github.com/hasanpeal/Keepit/issues).

---

We hope you find KeepIt useful for managing your tasks and improving your productivity. Thank you for checking out our project!

---

**Note**: This README file is designed to give recruiters and contributors a comprehensive overview of the project, its setup, and usage. The project is actively maintained, and we appreciate any feedback or contributions.
