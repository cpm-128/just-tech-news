const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST/CREATE a comment
router.post('/', (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
            // use the id from the session for the user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// DELETE a comment by id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        // if no comment found
        if (!dbCommentData) {
            res.status(400).json({
                message: 'No comment found with this id.'
            });
            return;
        }
        // success
        res.json(dbCommentData);
    })
    // if error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;