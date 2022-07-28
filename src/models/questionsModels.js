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

function getQuestionsDb() {
  try {
    const sql = 'SELECT * FROM  questions';
    return executeDb(sql);
  } catch (error) {
    console.log('error in getQuestionsDb ===', error);
    throw error;
  }
}

async function postQuestionDb(userId, title, content) {
  try {
    const sql = 'INSERT INTO questions(user_id, title, content) VALUES (?, ?, ?)';
    const postQuestionResult = await executeDb(sql, [userId, title, content]);
    console.log('postQuestionResult  ===', postQuestionResult);
    if (postQuestionResult.affectedRows === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log('error in postQuestionsDb ===', error);
    throw error;
  }
}

async function patchQuestionDb(userId, questionId, title, content) {
  try {
    const verifyUserSql = 'SELECT * FROM questions WHERE id = ?';
    const foundQuestionResult = await executeDb(verifyUserSql, [questionId]);
    if (foundQuestionResult.length === 0) {
      return { success: false, empty: true };
    }
    if (foundQuestionResult[0].user_id !== userId) {
      return { success: false, unauthorized: true };
    }

    const sql = `UPDATE questions
    SET title = ?, content = ?
    WHERE id = ?
    `;
    const patchQuestionResult = await executeDb(sql, [title, content, questionId]);
    console.log('patchQuestionResult  ===', patchQuestionResult);
    if (patchQuestionResult.affectedRows === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log('error in patchQuestionsDb ===', error);
    throw error;
  }
}

module.exports = {
  getQuestionsDb,
  postQuestionDb,
  patchQuestionDb,
};
