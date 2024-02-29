const express = require('express');
const app = express();
const db = require('./config/db')
require('dotenv').config();

const port = process.env.PORT;

db.connect();
// ROUTE
const route = require('./routes/index.route')
route(app);

app.listen(port, () => {
    console.log(`Server started on port`, port);
});
