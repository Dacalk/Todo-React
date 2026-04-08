const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // This fixes the CORS error automatically
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Default XAMPP password is empty
    database: 'todo_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// --- API ROUTES ---

// 1. GET all tasks
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. POST a new task
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    db.query('INSERT INTO tasks (text) VALUES (?)', [text], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, text });
    });
});

// 3. PUT - Toggle task completion
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id, completed });
    });
});

// 4. DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted successfully" });
    });
});

// Initialize Database Column (Optional helper)
db.query("ALTER TABLE tasks ADD COLUMN IF NOT EXISTS completed TINYINT(1) DEFAULT 0", (err) => {
    if (err) console.log("Note: Column 'completed' might already exist or table missing.");
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});