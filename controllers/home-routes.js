// user-facing routes, such as the homepage and login page

const router = require('express').Router();

router.get('/', (req, res) => {
    // which vews layout to render?
    res.render('homepage', {
        // pass in the post object
        id: 1,
        post_url: 'https://handlebarsjs.com/guide/',
        title: 'Handlebars Docs',
        created_at: new Date(),
        vote_count: 10,
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    });
});

module.exports = router;