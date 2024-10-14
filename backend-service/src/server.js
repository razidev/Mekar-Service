require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const formRoute = require('./routes');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/', formRoute);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ status: 'fail', message, data });
    next();
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT);
        console.log(`server is available on port ${process.env.PORT}!`);

    })
    .catch(err => {
        console.log('Error connecting to server:', err);
    });