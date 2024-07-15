const express = require('express');
const db= require("./db")
const bodyParser = require('body-parser');

const routes=require("./routes")
const app = express();
app.use("/api", routes)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.listen(3000, () => {
    console.log('Server running on port 3000');
});