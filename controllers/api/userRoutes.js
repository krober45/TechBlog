const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({ attributes: { exclude: ['password']} });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user by id
router.get('/:id', async (req, res) => {
    try {
        const singleUserData = await User.findOne({
            attributes: { 
                exclude: ['password'] 
            },
            where: {
                id: req.params.id
            },
            include: [{
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }]
        });

        if (!singleUserData) {
            res
                .status(400)
                .json({ message: 'No user found'});
            return;
        }

        res.status(200).json(singleUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post user and start session
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login to create session
router.post('/login', async (req, res) => {
    try {
        const userLogin = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userLogin) {
            res
            .status(400)
            .json({ message: 'Incorrect login credentials, please try again' });

            return;
        }
        const correctPassword = await userLogin.checkPassword(req.body.password);

        if (!correctPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect login credentials, please try again' });

            return;
        }

        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;

            res.json({ user: userLogin, message: 'Thank you for logging in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//update user by id
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!updateUser) {
            res
                .status(400)
                .json({ message: 'No user found'});
            return;
        }

        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deleteUser) {
            res
                .status(400)
                .json({ message: 'No user found' });
            return;
        }

        res.status(200).json(deleteUser);
    } catch {
        res.status(500).json(err);
    }
});

module.exports = router;