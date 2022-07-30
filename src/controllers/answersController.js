const {
  getAnswersDb,
  postAnswerDb,
  patchAnswerDb,
  deleteAnswerDb,
} = require('../models/answersModels');

async function getAnswers(req, res) {
  const answerId = +req.params.answerId;

  if (!answerId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  try {
    const allAnswers = await getAnswersDb(answerId);
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
  const answerId = +req.params.answerId;

  if (!userId || !answerId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('answerId ===', answerId);
  try {
    const postAnswerResult = await postAnswerDb(userId, answerId, content);
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

async function deleteAnswer(req, res) {
  const { userId } = req.body;
  const answerId = +req.params.answerId;

  if (!userId || !answerId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('userId ===', userId);
  console.log('answerId ===', answerId);
  try {
    const deleteAnswerResult = await deleteAnswerDb(userId, answerId);
    console.log('deleteAnswerResult ===', deleteAnswerResult);
    if (!deleteAnswerResult.success && deleteAnswerResult.empty) {
      res.status(400).json({ success: false, message: 'Answer not found' });
      return;
    }
    if (!deleteAnswerResult.success && deleteAnswerResult.unauthorized) {
      res.status(400).json({ success: false, message: 'Access forbidden' });
      return;
    }
    if (!deleteAnswerResult.success) {
      res.status(400).json({ success: false, message: 'Failed to delete Answer' });
      return;
    }
    res.status(200).json({ success: true, result: 'Answer successfully deleted' });
  } catch (error) {
    console.log('error in deleteAnswer  ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

module.exports = {
  getAnswers,
  postAnswer,
  patchAnswer,
  deleteAnswer,
};
