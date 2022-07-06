const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create User model that is an extension of all the functionality the Model class has
class User extends Model {}

// define table columns and configuration
User.init(
    {   // ================================
        // TABLE COLUMN DEFINITIONS GO HERE
        // ================================

        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQLs NOT NULL option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // do not allow duplicate values
            unique: true,
            // if allowNull is set to false, run the data through validators before create the table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be atleast 4 characters long
                len: [4]
            }
        }
    },
    {   // ====================================
        // TABLE CONFIGURATIONS OPTIONS GO HERE
        //=====================================

        // functions to call before or after calls in Sequelize, like hash
        hooks: {
            // set up beforeCreate lifecycle 'hook' functionality to fire just before a new User is created
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },
            // set up a hook for a password update
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // pass in the imported sequelize connection (the direct connection to the db)
        sequelize,
        // do not automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // do not pluralize name of the database table
        freezeTableName: true,
        // use underscores instread of camel-casing
        underscored: true,
        // keep model name lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;