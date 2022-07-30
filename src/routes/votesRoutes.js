const express = require('express');
const controller = require('../controllers/votesController');
const { validateToken } = require('../middleWare');

const votesRoutes = express.Router();

votesRoutes.get('/answers/votes', validateToken, controller.getVotes);
// votesRoutes.post('/questions/:questionId/answers', validateToken, controller.postAnswer);

module.exports = votesRoutes;
