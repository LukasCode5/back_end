const { getVotesDb } = require('../models/votesModels');

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

module.exports = {
  getVotes,
};
