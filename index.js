const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const db = require('./config/db')
db.connect();
app.use(cors());

app.use(bodyParser.json())

// ROUTE
const route = require('./routes/index.route')
route(app);

app.listen(port, () => {
    console.log(`Server started on port`, port);
});
