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
questionsRoutes.patch(
  '/questions/:questionId',
  validateTokenPost,
  validateQuestion,
  controller.patchQuestion
);

module.exports = questionsRoutes;
