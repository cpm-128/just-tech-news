// this file is used to collect and export all models

const User = require('./User');
const Post = require('./Post');

module.exports = { User, Post };

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