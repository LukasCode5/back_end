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

async function getAllAnswersDb() {
  try {
    const sql = 'SELECT * FROM answers';
    return executeDb(sql);
  } catch (error) {
    console.log('error in getAllAnswersDb ===', error);
    throw error;
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

async function patchAnswerDb(userId, answerId, content) {
  try {
    const verifyUserSql = 'SELECT * FROM answers WHERE id = ?';
    const foundAnswerResult = await executeDb(verifyUserSql, [answerId]);
    if (foundAnswerResult.length === 0) {
      return { success: false, empty: true };
    }
    if (foundAnswerResult[0].user_id !== userId) {
      return { success: false, unauthorized: true };
    }

    const sql = `UPDATE answers
    SET content = ?
    WHERE id = ?
    `;
    const patchAnswerResult = await executeDb(sql, [content, answerId]);
    console.log('patchAnswerResult  ===', patchAnswerResult);
    if (patchAnswerResult.affectedRows === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log('error in patchAnswerDb ===', error);
    throw error;
  }
}

async function deleteAnswerDb(userId, answerId) {
  try {
    const verifyUserSql = 'SELECT * FROM answers WHERE id = ?';
    const foundAnswerResult = await executeDb(verifyUserSql, [answerId]);
    if (foundAnswerResult.length === 0) {
      return { success: false, empty: true };
    }
    if (foundAnswerResult[0].user_id !== userId) {
      return { success: false, unauthorized: true };
    }

    const sqlDeleteAnswer = 'DELETE FROM answers WHERE id =?';
    const deleteAnswerResult = await executeDb(sqlDeleteAnswer, [answerId]);
    console.log('deleteAnswerResult  ===', deleteAnswerResult);
    if (deleteAnswerResult.affectedRows === 0) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.log('error in deleteAnswerDb ===', error);
    throw error;
  }
}

async function deleteAnswersDb(userId, questionId) {
  try {
    const verifyAnswersSql = 'SELECT * FROM answers WHERE question_id = ?';
    const foundAnswersResult = await executeDb(verifyAnswersSql, [questionId]);
    if (foundAnswersResult.length === 0) {
      return { success: false, empty: true };
    }
    if (foundAnswersResult[0].user_id !== userId) {
      return { success: false, unauthorized: true };
    }

    const sqlDeleteAnswers = 'DELETE FROM answers WHERE question_id =?';
    const deleteAnswersResult = await executeDb(sqlDeleteAnswers, [questionId]);
    console.log('deleteAnswersResult  ===', deleteAnswersResult);
    if (deleteAnswersResult.affectedRows === 0) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.log('error in deleteAnswersDb ===', error);
    throw error;
  }
}

module.exports = {
  getAnswersDb,
  postAnswerDb,
  patchAnswerDb,
  deleteAnswerDb,
  deleteAnswersDb,
  getAllAnswersDb,
};
