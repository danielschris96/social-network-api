const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const router = require('express').Router();

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;