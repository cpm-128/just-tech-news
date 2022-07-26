const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// ===============
// CRUD OPERATIONS
// ===============

// GET /api/users
router.get('/', (req, res) => {
    // access the User model and run .findAll() method
    User.findAll({
        // do not display user password
        attributes: { exclude: ['password'] }
    })
        // any data found fro mthe findAll method will THEN be assigned the dbUserData variable
        // pass it as an argument to the res.json method
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        // do not display user password
        attributes: { exclude: ['password'] },
        // passing an argument into the findOne method
        where: {
            id: req.params.id
        },
        // posts that this user voted on
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            },
            { // comments
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        // check the id exists
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id.'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', meail: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        // access session information
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login Route for Authentication - compares user-entered password to hashed password
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        // does user exist?
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address is found.' });
            return;
        }

        // verify user using the password they entered in the body
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password.' });
            return;
        }

        // save session information
        req.session.save(() => {
            //DECLARE session variables ON LOG IN
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in.' });
        });
    });
});

// LOGOUT by destroying session variables and resetting cookie
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
    });

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', meail: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can use 'req.body' instread
    // req.body to provide new data
    // req.params.id to indicate exactly where the new data goes
    User.update(req.body, {
        // allow to hash a new password update
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;