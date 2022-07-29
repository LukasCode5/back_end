const {
  getQuestionsDb,
  postQuestionDb,
  patchQuestionDb,
  deleteQuestionDb,
} = require('../models/questionsModels');

async function getQuestions(req, res) {
  try {
    const allQuestions = await getQuestionsDb();
    console.log('allQuestions ===', allQuestions);
    if (allQuestions.length === 0) {
      res.status(400).json({ success: false, message: 'No Questions found' });
      return;
    }
    res.status(200).json({ success: true, result: allQuestions });
  } catch (error) {
    console.log('error in getQuestions ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

async function postQuestion(req, res) {
  const { userId, title, content } = req.body;

  if (!userId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }
  try {
    const postQuestionResult = await postQuestionDb(userId, title, content);
    console.log('postQuestionResult ===', postQuestionResult);
    if (!postQuestionResult.success) {
      res.status(400).json({ success: false, message: 'Failed to add Question' });
      return;
    }
    res.status(201).json({ success: true, result: 'Question successfully added' });
  } catch (error) {
    console.log('error in getQuestions ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

async function patchQuestion(req, res) {
  const { userId, title, content } = req.body;
  const questionId = +req.params.questionId;

  if (!userId || !questionId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('userId ===', userId);
  console.log('title ===', title);
  console.log('content ===', content);
  console.log('questionId ===', questionId);

  try {
    const patchQuestionResult = await patchQuestionDb(userId, questionId, title, content);
    console.log('patchQuestionResult ===', patchQuestionResult);

    if (!patchQuestionResult.success && patchQuestionResult.empty) {
      res.status(400).json({ success: false, message: 'Question not found' });
      return;
    }
    if (!patchQuestionResult.success && patchQuestionResult.unauthorized) {
      res.status(400).json({ success: false, message: 'Access forbidden' });
      return;
    }
    if (!patchQuestionResult.success) {
      res.status(400).json({ success: false, message: 'Failed to update Question' });
      return;
    }
    res.status(201).json({ success: true, result: 'Question successfully updated' });
  } catch (error) {
    console.log('error in getQuestions ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

async function deleteQuestion(req, res) {
  const { userId } = req.body;
  const questionId = +req.params.questionId;

  if (!userId || !questionId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('userId ===', userId);
  console.log('questionId ===', questionId);
  try {
    const deleteQuestionResult = await deleteQuestionDb(userId, questionId);
    console.log('deleteQuestionResult ===', deleteQuestionResult);
    if (!deleteQuestionResult.success && deleteQuestionResult.empty) {
      res.status(400).json({ success: false, message: 'Question not found' });
      return;
    }
    if (!deleteQuestionResult.success && deleteQuestionResult.unauthorized) {
      res.status(400).json({ success: false, message: 'Access forbidden' });
      return;
    }
    if (!deleteQuestionResult.success) {
      res.status(400).json({ success: false, message: 'Failed to delete Question' });
      return;
    }
    res.status(200).json({ success: true, result: 'Question successfully deleted' });
  } catch (error) {
    console.log('error in getQuestions ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

module.exports = {
  getQuestions,
  postQuestion,
  patchQuestion,
  deleteQuestion,
};
