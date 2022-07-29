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
// answersRoutes.patch(
//   '/questions/:questionId',
//   validateToken,
//   validateQuestion,
//   controller.patchQuestion
// );
// answersRoutes.delete('/questions/:questionId', validateToken, controller.deleteQuestion);

module.exports = answersRoutes;
