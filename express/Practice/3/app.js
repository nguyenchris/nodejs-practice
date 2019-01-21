const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const mainRoutes = require('./routes/main');
const usersRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(mainRoutes.routes);
app.use(usersRoutes);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000);