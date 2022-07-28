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
questionsRoutes.post('/questions', validateToken, validateQuestion, controller.postQuestion);
questionsRoutes.patch(
  '/questions/:questionId',
  validateToken,
  validateQuestion,
  controller.patchQuestion
);
questionsRoutes.delete('/questions/:questionId', validateToken, controller.deleteQuestion);

module.exports = questionsRoutes;
