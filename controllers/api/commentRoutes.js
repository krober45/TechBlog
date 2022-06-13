const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', async (req, res) => {
    try {
        const allComment = await Comment.findAll({
            attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
            order: [['created_at', 'ASC']],
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        res.status(200).json(allComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a single comment by id
router.get('/:id', async (req, res) => {
    try {
        const userComments = await Comment.findAll({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
            order: [['created_at', 'ASC']],
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        res.status(200).json(userComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post comment
router.post('/', withAuth, async (req, res) => {
    try {
        const postComment = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        if (!req.session) {
            res
                .status(400)
                .json({ message: 'Please log in to continue' });
            return;
        }

        res.status(200).json(postComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (!updateComment) {
            res
                .status(400)
                .json({ message: 'No comment found' })
            return;
        }

        res.status(200).json(updateComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deleteComment) {
            res
                .status(400)
                .json({ message: 'No comment found' });
            return;
        }

        res.status(200).json(deleteComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;