const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');



module.exports = router;