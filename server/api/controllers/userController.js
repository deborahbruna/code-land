const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

const User = require('../models/User');

router.get('/', async(req, res) => {

  try {

    const users = await User.find();

    return res.send({ ok: true, users });

  } catch (err) {
    return res.status(400).send({ ok: false, error: 'Error loading users' });
  }

});

router.get('/:userId', async(req, res) => {
  const userId = req.params.userId;

  try {

    const user = await User.findById(userId);

    return res.send({ ok: true, user });

  } catch (err) {
    return res.status(400).send({ ok: false, error: `Error loading user id ${userId}` });
  }

}); 


router.delete('/:userId', async(req, res) => {

  const userId = req.params.userId;

  try {

    await User.findByIdAndRemove(userId);

    return res.send({ ok: true, message: `User id ${userId} removed`});

  } catch (err) {
    return res.status(400).send({ ok: false, error: `Error deleting user id ${userId}` });
  }

});

module.exports = app => app.use('/api/users', router);