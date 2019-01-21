const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const users = [];

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'main.html'));
    res.render('main', {
        pageTitle: 'Add a User',
        path: '/'
    })
});

router.post('/', (req, res, next) => {
    users.push({
        user: req.body.user
    })
    res.redirect('/');
});

exports.routes = router;
exports.user = users;