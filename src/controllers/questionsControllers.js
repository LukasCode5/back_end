const { getQuestionsDb, postQuestionDb } = require('../models/questionsModels');

async function getQuestions(req, res) {
  try {
    const allQuestions = await getQuestionsDb();
    console.log('allQuestions ===', allQuestions);
    if (allQuestions.length === 0) {
      res.status(400).json({ success: false, message: 'No questions found' });
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
  try {
    const postQuestionResult = await postQuestionDb(userId, title, content);
    console.log('postQuestionResult ===', postQuestionResult);
    if (!postQuestionResult.success) {
      res.status(400).json({ success: false, message: 'Failed to add question' });
      return;
    }
    res.status(201).json({ success: true, result: 'Question successfully added' });
  } catch (error) {
    console.log('error in getQuestions ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

module.exports = {
  getQuestions,
  postQuestion,
};
