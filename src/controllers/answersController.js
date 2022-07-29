const { getAnswersDb, postAnswerDb, patchAnswerDb } = require('../models/answersModels');

async function getAnswers(req, res) {
  const questionId = +req.params.questionId;

  if (!questionId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  try {
    const allAnswers = await getAnswersDb(questionId);
    console.log('allQuestions ===', allAnswers);
    if (allAnswers.length === 0) {
      res.status(400).json({ success: false, message: 'No Answers found' });
      return;
    }
    res.status(200).json({ success: true, result: allAnswers });
  } catch (error) {
    console.log('error in getAnswers ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

async function postAnswer(req, res) {
  const { userId, content } = req.body;
  const questionId = +req.params.questionId;

  if (!userId || !questionId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('questionId ===', questionId);
  try {
    const postAnswerResult = await postAnswerDb(userId, questionId, content);
    console.log('postAnswerResult ===', postAnswerResult);
    if (!postAnswerResult.success) {
      res.status(400).json({ success: false, message: 'Failed to add Answer' });
      return;
    }
    res.status(201).json({ success: true, result: 'Answer successfully added' });
  } catch (error) {
    console.log('error in postAnswer ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}
async function patchAnswer(req, res) {
  const { userId, content } = req.body;
  const answerId = +req.params.answerId;

  if (!userId || !answerId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('answerId ===', answerId);
  try {
    const postAnswerResult = await patchAnswerDb(userId, answerId, content);
    console.log('postAnswerResult ===', postAnswerResult);

    if (!postAnswerResult.success && postAnswerResult.empty) {
      res.status(400).json({ success: false, message: 'Answer not found' });
      return;
    }
    if (!postAnswerResult.success && postAnswerResult.unauthorized) {
      res.status(400).json({ success: false, message: 'Access forbidden' });
      return;
    }
    if (!postAnswerResult.success) {
      res.status(400).json({ success: false, message: 'Failed to update Answer' });
      return;
    }
    res.status(201).json({ success: true, result: 'Answer successfully updated' });
  } catch (error) {
    console.log('error in postAnswer ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

module.exports = {
  getAnswers,
  postAnswer,
  patchAnswer,
};
