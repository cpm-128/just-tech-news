// collect all of the API routes and package them up

const router = require('express').Router();

const userRoutes = require('./user-routes');

// prefix all the routes in userRoutes with /users
router.use('/users', userRoutes);

module.exports = router;