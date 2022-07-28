const express = require('express');
const controller = require('../controllers/questionsControllers');
const {
  validateUser,
  validateLoginUser,
  validateToken,
  validateTokenPost,
  validateQuestion,
} = require('../middleWare');

const questionsRoutes = express.Router();

questionsRoutes.get('/questions', controller.getQuestions);
questionsRoutes.post('/questions', validateTokenPost, validateQuestion, controller.postQuestion);

module.exports = questionsRoutes;
