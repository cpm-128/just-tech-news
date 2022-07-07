const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model ths inherits all the functionality of the Model class
class Post extends Model {
    // make Post.upvote() its own method
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}

// define the table
Post.init(
    {   // ================================
        // TABLE COLUMN DEFINITIONS GO HERE
        // defining the Post schema
        // ================================
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            // Sequelize validation for a url
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            // FOREIGN KEY LINK
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {   // ====================================
        // TABLE CONFIGURATIONS OPTIONS GO HERE
        // configure the metadata
        //=====================================
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;