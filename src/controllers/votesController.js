const { getVotesDb, postVoteDb } = require('../models/votesModels');

async function getVotes(req, res) {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  try {
    const allUsersVotes = await getVotesDb();
    console.log('allUsersVotes ===', allUsersVotes);
    if (allUsersVotes.length === 0) {
      res.status(400).json({ success: false, message: 'No Votes found' });
      return;
    }
    res.status(200).json({ success: true, result: allUsersVotes });
  } catch (error) {
    console.log('error in getVotes ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

async function postVote(req, res) {
  const { userId } = req.body;
  const answerId = +req.params.answerId;
  const voteValue = req.params.voteValue.toLowerCase();
  // eslint-disable-next-line no-nested-ternary
  const finalVote = voteValue === 'up' ? 1 : voteValue === 'down' ? -1 : undefined;

  if (!userId || !answerId || !voteValue || !finalVote) {
    res.status(400).json({ success: false, message: 'Missing data' });
    return;
  }

  console.log('userId ===', userId);
  console.log('questionId ===', answerId);
  console.log('voteValue ===', voteValue);
  console.log('finalVote ===', finalVote);

  try {
    const postVoteResult = await postVoteDb(userId, answerId, finalVote);
    console.log('postVoteResult ===', postVoteResult);

    if (!postVoteResult.success && postVoteResult.empty) {
      res.status(400).json({ success: false, message: 'Answer not found' });
      return;
    }
    if (!postVoteResult.success && postVoteResult.duplicate) {
      res.status(400).json({ success: false, message: 'Only 1 vote per user' });
      return;
    }

    if (!postVoteResult.success) {
      res.status(400).json({ success: false, message: 'Failed to vote Answer' });
      return;
    }

    res.status(201).json({ success: true, result: 'Answer successfully voted' });
  } catch (error) {
    console.log('error in postVote ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

module.exports = {
  getVotes,
  postVote,
};
