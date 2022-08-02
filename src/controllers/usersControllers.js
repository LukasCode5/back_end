const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { registerUserDb, findUserByEmailDb } = require('../models/usersModels');

async function registerUser(req, res) {
  // console.log('registerUser controller ran');

  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);

  try {
    const registerUserResult = await registerUserDb(newUser);
    if (registerUserResult.affectedRows === 1) {
      res.status(201).json({ success: true, message: 'User has been registered' });
    }
  } catch (error) {
    // console.log('error in registerUser ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

async function loginUser(req, res) {
  // console.log('loginUser controller ran');
  const logUser = req.body;
  try {
    // console.log('logUser.email ===', logUser.email);
    const foundUserResult = await findUserByEmailDb(logUser.email);
    // console.log('foundUserResult ===', foundUserResult);

    if (!foundUserResult) {
      res.status(400).json({ success: false, message: ' Incorrect email or password' });
      return;
    }

    if (!bcrypt.compareSync(logUser.password, foundUserResult.password)) {
      res.status(400).json({ success: false, message: 'Incorrect email or password' });
      return;
    }

    if (!jwtSecret) {
      res.status(500).json({ success: false, message: 'Something went wrong' });
      return;
    }

    const payload = { userId: foundUserResult.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ success: true, token, userId: foundUserResult.id });
  } catch (error) {
    console.log('error in loginUser ===', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
