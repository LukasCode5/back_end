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

module.exports = {
  getVotesDb,
};
