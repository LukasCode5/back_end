const express = require('express');
const controller = require('../controllers/answersController');
const { validateToken, validateAnswer } = require('../middleWare');

const answersRoutes = express.Router();

answersRoutes.get('/questions/:questionId/answers', controller.getAnswers);
answersRoutes.post(
  '/questions/:questionId/answers',
  validateToken,
  validateAnswer,
  controller.postAnswer
);
answersRoutes.patch('/answers/:answerId', validateToken, validateAnswer, controller.patchAnswer);
answersRoutes.delete('/answers/id/:answerId', validateToken, controller.deleteAnswer);
// answersRoutes.delete('/answers/:questionId', validateToken, controller.deleteAnswers);

module.exports = answersRoutes;
