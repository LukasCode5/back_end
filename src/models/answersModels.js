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

async function getAnswersDb(questionId) {
  try {
    const sql = 'SELECT * FROM answers WHERE question_id=?';
    return executeDb(sql, [questionId]);
  } catch (error) {
    console.log('error in getAnswersDb ===', error);
    throw error;
  }
}

async function postAnswerDb(userId, questionId, content) {
  try {
    const sql = 'INSERT INTO answers(user_id, question_id, content) VALUES (?, ?, ?)';
    const postAnswerResult = await executeDb(sql, [userId, questionId, content]);
    console.log('postAnswerResult  ===', postAnswerResult);
    if (postAnswerResult.affectedRows === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log('error in postAnswerDb ===', error);
    throw error;
  }
}

module.exports = {
  getAnswersDb,
  postAnswerDb,
};
