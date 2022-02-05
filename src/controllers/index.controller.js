const req = require("express/lib/request");

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345678',
    database: 'chat',
    port: '5433'
});

const getMsgs = async (req, res) => {
    const response = await pool.query('SELECT * FROM mensaje ORDER BY id ASC');
    res.status(200).json(response.rows);
};

module.exports={
    getMsgs
}