// collect all of the API routes and package them up

const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// prefix all the routes in userRoutes with /users
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;