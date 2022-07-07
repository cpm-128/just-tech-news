// this file is used to collect and export all models

const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

module.exports = { User, Post, Vote };

// define model associations
// one to many
User.hasMany(Post, {
    // the fk name in the Post table which references the pk in the User table
    foreignKey: 'user_id'
});

// make the reverse association as well
// one to one
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Votes association allowing both User and Post models to query eachother with the foreign key in Vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
})

// Associate votes to posts and users, allows for vote counting
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});