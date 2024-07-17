const express = require('express');
const db= require("./db")
const bodyParser = require('body-parser');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const routes=require("./routes")
app.use("/api", routes)

app.listen(3000, () => {
    console.log('Server running on port 3000');
});