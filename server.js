const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware so express knows how to handle incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connect to db and server
// force: true resyncs the connections and tables recreated
// this includes DROPPING any data or records stored on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('>> NOW LISTENING'));
})