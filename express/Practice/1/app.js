const http = require('http');
const express = require('express');
const app = express();

app.use('/users', (req, res) => {
    console.log('2nd');
    res.send('<h1>USERSSSSSS</h1>');
});

app.use('/', (req, res, next) => {
    console.log('First');
    res.send('<h1>First / </h1>');
});



app.listen(3000);