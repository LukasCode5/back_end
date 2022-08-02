const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUser(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(20).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error in validateUser ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateLoginUser(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(20).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error in validateLoginUser ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}
async function validateQuestion(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    title: Joi.string().trim().min(5).max(100).required(),
    // eslint-disable-next-line newline-per-chained-call
    content: Joi.string().trim().min(5).max(600).required(),
  });
  const { title, content } = req.body;
  const newQuestion = {
    title,
    content,
  };
  try {
    await schema.validateAsync(newQuestion, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error in validateQuestion ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}
async function validateAnswer(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    content: Joi.string().trim().min(5).max(600).required(),
  });
  const { content } = req.body;
  const newAnswer = {
    content,
  };
  try {
    await schema.validateAsync(newAnswer, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error in validateAnswer ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];

  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'no token found',
    });
    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const { userId } = tokenPayload;

    req.body.userId = userId;

    next();
  } catch (error) {
    console.log('jwt.verify error in validateToken ===', error);
    res.status(403).json({
      success: false,
      error: {
        token: 'invalid token',
      },
    });
  }
}

async function validateTokenPost(req, res, next) {
  const tokenFromPost = req.body.token;
  console.log('tokenFromPost ===', tokenFromPost);
  if (!tokenFromPost) {
    res.status(401).json({
      success: false,
      error: 'no token found',
    });
    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromPost, jwtSecret);
    // console.log('tokenPayload in post ===', tokenPayload);
    const { userId } = tokenPayload;
    // console.log('userId in post ===', userId);

    req.body.userId = userId;

    next();
  } catch (error) {
    console.log('jwt.verify error in validateTokenPost ===', error);
    res.status(403).json({
      success: false,
      error: {
        token: 'invalid token',
      },
    });
  }
}

module.exports = {
  showBody,
  validateUser,
  validateLoginUser,
  validateToken,
  validateTokenPost,
  validateQuestion,
  validateAnswer,
};
