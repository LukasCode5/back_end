const express = require('express');
const controller = require('../controllers/answersController');
const { validateToken } = require('../middleWare');

const answersRoutes = express.Router();

answersRoutes.get('/questions/:questionId/answers', controller.getAnswers);
// answersRoutes.post('/questions', validateToken, validateQuestion, controller.postQuestion);
// answersRoutes.patch(
//   '/questions/:questionId',
//   validateToken,
//   validateQuestion,
//   controller.patchQuestion
// );
// answersRoutes.delete('/questions/:questionId', validateToken, controller.deleteQuestion);

module.exports = answersRoutes;
