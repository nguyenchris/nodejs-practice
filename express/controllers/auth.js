const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
    res.render('auth/login', {
        activeLogin: true,
        authCSS: true,
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('5c738d15dcd693210ee923df')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save(() => {
                res.redirect('/');
            })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
};