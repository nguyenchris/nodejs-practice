const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const main = require('./main');

router.get('/users', (req, res, next) => {
    const users = main.user;
    res.render('users', {
        pageTitle: 'Users',
        users: users
    })
})


module.exports = router;