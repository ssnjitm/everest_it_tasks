import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import 'dotenv/config';


const app = express();
app.use(express.json());

// Database Connection Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// GET: Fetch all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM users');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// POST: Insert a new user
app.post('/users', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
        await connection.end();
        res.status(201).json({ message: 'User created', userId: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});