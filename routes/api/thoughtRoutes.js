const router = require('express').Router();
// require the user controller
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');
// routes for /api/thoughts
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;