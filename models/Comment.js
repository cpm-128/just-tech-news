const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}

// define the table
Comment.init(
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
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            // validate the comment has at least 1 character
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // FOREIGN KEY LINK
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // FOREIGN KEY LINK
            references: {
                model: 'post',
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
        modelName: 'comment'
    }
);

module.exports = Comment;