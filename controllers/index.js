const router = require('express').Router();
const apiRoute = require('./api');
const homeRoute = require('./homeRoute');
const dashBoardRoute = require('./dashboardRoutes');

router.use('/api', apiRoute);
router.use('/', homeRoute);
router.use('/dashboard', dashBoardRoute);

module.exports = router;