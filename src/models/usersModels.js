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

async function registerUserDb(userObj) {
  // console.log('registerUserDb model ran');
  const sql = 'INSERT INTO users(email, password) VALUES(?,?)';
  return executeDb(sql, [userObj.email, userObj.password]);
}

async function findUserByEmailDb(userEmail) {
  // console.log('findUserByEmailDb model ran');
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const findResult = await executeDb(sql, [userEmail]);
    return findResult[0];
  } catch (error) {
    console.log('error in findUserByEmailDb', error);
    throw error;
  }
}

module.exports = {
  registerUserDb,
  findUserByEmailDb,
};
