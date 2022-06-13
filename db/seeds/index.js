const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const userData = require('./userSeed');
const postData = require('./postSeed');
const commentData = require('./commentSeed');


const seedAll = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedAll();