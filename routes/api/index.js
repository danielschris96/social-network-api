const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');
const router = require('express').Router();


router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/reaction', reactionRoutes);
router.use('/friend', friendRoutes);

module.exports = router;