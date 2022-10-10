const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

assert(process.env.SECRET, "Missing SECRET environment variable ")
const SECRET = process.env.SECRET;

const User = require('../models/User');

const router = express.Router();


generateToken = (params = {}) => {
  return jwt.sign(params, SECRET, {
    expiresIn: 86400
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {

    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });

    const user = await User.create(req.body);

    user.password = undefined;

    res.send({
      user,
      token: generateToken({ id: user.id })
    });

  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user)
    return req.status(400).send({ error: 'User not found' });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' });

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id })
  });

});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
    return req.status(400).send({ error: 'User not found' });

    const passwordResetToken = crypto.randomBytes(20).toString('hex');

    const passwordResetExpires = new Date();
    passwordResetExpires.setHours(passwordResetExpires.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken,
        passwordResetExpires
      }
    });

    mailer.sendMail({
      to: email,
      from: 'deborah-bruna@live.com',
      subject: 'Code Land - Forgot Password',
      template: 'auth/forgot_password',
      context: { token: passwordResetToken }
    }, (err) => {
      if (err)
        return res.status(400).send({ error: 'Cannot send forgot password email' });

      return res.send({ ok: true });
    })
  

  } catch(err) {
    res.status(400).send({ error: 'Error on forgot password, try again' });
  }
});

router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');
    
    if (!user)
      return req.status(400).send({ error: 'User not found' });

    if (token !== user.passwordResetToken)
      return req.status(400).send({ error: 'Token invalid' });

    const now = new Date();
    if (now > user.passwordResetExpires)
      return req.status(400).send({ error: 'Token expired, generate a new one' });

    user.password = password;

    await user.save();

    res.send({ ok: true });

  } catch (err) {
    res.status(400).send({ error: 'Cannot reset password, try again' });
  }
});

module.exports = app => app.use('/auth', router);