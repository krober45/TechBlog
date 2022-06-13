const router = require('express').Router();
const { User, Post, Comment } = require('../../Tech Blog/models');
const withAuth = require('../../Tech Blog/utils/auth');

//get all user posts
router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'ASC']],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });

        const posts = allPosts.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//new post
router.get('/new', (req, res) => {
    res.render('newPost');
});

//edit post by id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const findOnePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });

        if (!findOnePost) {
            res
                .status(400)
                .json({ message: 'No post found' });
            return;
        }

        const posts = findOnePost.get({ plain: true });

        res.render('editPost', {
            posts, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;