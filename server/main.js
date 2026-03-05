const express = require('express');
const mysql = require('mysql2/promise'); // for connecting to db
const cors = require('cors'); //idk
const path = require('path'); //idk
const fs = require('fs/promises');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'pantree',
    waitForConnections: true,
    connectionLimit: 10, //idk what limit we should put here
    queueLimit: 0,
})

//General Route
//get example
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users;');
        console.log(rows);
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Error fetching user data"});
    }
})
//post example
app.post('/', async (req, res, next) => {
    const conn = await pool.getConnection();
    try {

    } catch (e) {
        try { await conn.rollback(); } catch (_) {}
        console.error(e);
        res.status(500).json({error: "Failed to INSERT MESSAGE HERE"})
    } finally {
        conn.release();
    }
})

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
})
