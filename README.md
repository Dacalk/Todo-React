# Focus Flow - Premium Task Manager

Focus Flow is a sophisticated, full-stack Todo application designed with a premium, high-end aesthetic. It combines a modern React frontend with a robust Node.js/MySQL backend to provide a seamless and focused productivity experience.

![Focus Flow Banner](file:///C:/Users/Daca_lk/.gemini/antigravity/brain/45bb79be-b0c0-411b-a05a-02b7be2dad9f/focus_flow_redesign_verification_1775628860744.png)

## ✨ Features

- **Premium Identity**: A stunning dark-glassmorphism UI with vibrant purple and indigo accents.
- **Dynamic Animations**: Smooth task reveals, glowing input focus effects, and pulsating status indicators.
- **Full-Stack Persistence**: Tasks are securely stored in a MySQL database.
- **Completion Logic**: Easily toggle tasks as "done" with instant visual feedback (strikethrough and opacity changes).
- **Responsive Layout**: Designed to look beautiful on desktops, tablets, and mobile devices.
- **Smart Counter**: Real-time tracking of active vs. completed tasks.

## 🚀 Tech Stack

- **Frontend**: 
  - [React 19](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Axios](https://axios-http.com/)
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MySQL2](https://github.com/sidorares/node-mysql2)
  - [CORS](https://github.com/expressjs/cors)

## 🛠️ Setup & Installation

### 1. Database Setup
- Ensure you have a MySQL server running (e.g., via XAMPP or local install).
- Create a database named `todo_db`.
- Import the provided SQL schema:
  ```bash
  mysql -u root todo_db < Backend/db/todo_db.sql
  ```
  *(Or use phpMyAdmin to import the file.)*

### 2. Backend Configuration
Navigate to the `Backend` directory and install dependencies:
```bash
cd Backend
npm install
node server.js
```
The server will start on `http://localhost:5000`.

### 3. Frontend Configuration
Navigate to the `Frontend` directory and install dependencies:
```bash
cd Frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
Todo-React/
├── Backend/
│   ├── db/
│   │   └── todo_db.sql    # Database schema
│   ├── server.js          # Express server & API routes
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── App.jsx        # Main application logic
│   │   ├── index.css      # Tailwind v4 styles & animations
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 📝 License

This project is open-source and available for all focus-seekers.
