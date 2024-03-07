const express = require('express');
const cors = require("cors");

const app = express();
const db = require('./config/db')
db.connect();


require('dotenv').config();
const port = process.env.PORT;

// const corsOptions = {
//     origin: "http://localhost:3000", // change this to your react app url
// }
// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json())

// ROUTE
const route = require('./routes/index.route')
route(app);

app.listen(port, () => {
    console.log(`Server started on port`, port);
});
