import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());


const dbConfig = {
    host: 'localhost',
    user: 'everest_user',
    password: 'Password123!', 
    database: 'my_app',
    rowsAsArray: false
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

