const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// make the frontend available to the client via middleware
const path = require('path');

// use Handlebars.js as app's template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})

const app = express();
const PORT = process.env.PORT || 3001;

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