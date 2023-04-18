const router = require('express').Router();
const { User } = require('../models');

//GET /auth/me
router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

//POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    console.log(req.body);
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

//POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.send({ token: await newUser.generateToken() });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User Already Exists');
    } else {
      next(error);
    }
  }
});

module.exports = router;
