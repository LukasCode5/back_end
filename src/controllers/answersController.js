const { getAnswersDb } = require('../models/answersModels');

async function getAnswers(req, res) {
  const questionId = +req.params.questionId;
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

module.exports = {
  getAnswers,
};
