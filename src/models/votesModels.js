const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArray = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArray);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw error;
  } finally {
    conn?.end();
  }
}

function getVotesDb() {
  try {
    const sql = 'SELECT * FROM  votes';
    return executeDb(sql);
  } catch (error) {
    console.log('error in getVotesDb ===', error);
    throw error;
  }
}

async function postVoteDb(userId, answerId, voteValue) {
  try {
    const verifyAnswerSql = 'SELECT * FROM answers WHERE id = ?';
    const foundAnswerResult = await executeDb(verifyAnswerSql, [answerId]);

    if (foundAnswerResult.length === 0) {
      return { success: false, empty: true };
    }

    const sqlVotes = 'SELECT * FROM votes WHERE answer_id = ?';
    const answerVotesResult = await executeDb(sqlVotes, [answerId]);

    if (answerVotesResult.length !== 0) {
      const foundVoteUserResult = answerVotesResult.find((voteObj) => voteObj.user_id === userId);

      if (foundVoteUserResult) {
        console.log('foundVoteUserResult.value ===', foundVoteUserResult.value);
        console.log('voteValue ===', voteValue);
        if (foundVoteUserResult.value === voteValue) return { duplicate: true };

        const sqlUpdateUserVote = `UPDATE votes
        SET value = ?
        WHERE user_id = ? AND answer_id = ?
        `;
        const updateUserVoteResult = await executeDb(sqlUpdateUserVote, [
          voteValue,
          userId,
          answerId,
        ]);

        if (updateUserVoteResult.affectedRows === 0) {
          return { success: false };
        }
      } else {
        const sqlAddUserVote = 'INSERT INTO votes(user_id,answer_id, value) VALUES (?, ?, ?)';
        const addUserVote = await executeDb(sqlAddUserVote, [userId, answerId, voteValue]);

        if (addUserVote.affectedRows === 0) {
          return { success: false };
        }
      }
    }

    // eslint-disable-next-line operator-linebreak
    const sqlAnswerVoteAdd =
      voteValue === 1
        ? `UPDATE answers
        SET votes = votes + ${1}
        WHERE id = ?
    `
        : `UPDATE answers
        SET votes = votes - ${1}
        WHERE id = ?`;

    const answerVoteAddResult = await executeDb(sqlAnswerVoteAdd, [answerId]);
    if (answerVoteAddResult.affectedRows === 0) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.log('error in postVoteDb ===', error);
    throw error;
  }
}

module.exports = {
  getVotesDb,
  postVoteDb,
};
