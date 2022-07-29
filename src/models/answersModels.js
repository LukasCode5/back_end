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

module.exports = {
  getAnswersDb,
};
