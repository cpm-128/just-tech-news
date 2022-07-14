const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// make the frontend available to the client via middleware
const path = require('path');

// use Handlebars.js as app's template engine with helper functions available
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers })

const app = express();
const PORT = process.env.PORT || 3001;

// sessions and cookies
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// use Handlebars.js as app's template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware so express knows how to handle incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle frontend public files
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
// routes must be after all static calls
app.use(routes);

// turn on connect to db and server
// force: true resyncs the connections and tables recreated
// this includes DROPPING any data or records stored on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('>> NOW LISTENING'));
})