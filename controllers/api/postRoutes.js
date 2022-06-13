const router = require('express').Router();
const { Post, User, Comment } = require('../../../Tech Blog/models');
const withAuth = require('../../utils/auth');

//get all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
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

        res.status(200).json(allPosts);
    } catch {
        res.status(500).json(err);
    }
});

//get post by id
router.get('/:id', async (req, res) => {
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

        res.status(200).json(findOnePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post a post
router.post('/', withAuth, async (req, res) => {
    try {
        const makePost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(makePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (!updatePost) {
            res
                .status(400)
                .json({ message: 'No post found with this id' })
            return;
        }

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletePost) {
            res
                .status(400)
                .json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;