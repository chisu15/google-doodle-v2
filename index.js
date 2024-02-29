const express = require('express');
const app = express();
const db = require('./config/db')
require('dotenv').config();

const port = process.env.PORT;

db.connect()
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200);
});

app.listen(port, () => {
    console.log(`Server started on port`);
});
