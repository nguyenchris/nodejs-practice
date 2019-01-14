const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const indexRoute = require('./routes/home');
const usersRoute = require('./routes/users');

app.use(indexRoute);
app.use(usersRoute);


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);