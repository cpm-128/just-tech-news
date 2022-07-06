// collect all of the API routes and package them up

const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// prefix all the routes in userRoutes with /users
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;