const router = require('express').Router();
const { User } = require('../models');

//POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    console.log(req.body);
    const usersToken = await User.authenticate(req.body);
    res.send({ token: usersToken });
  } catch (error) {
    console.error('>>>>>', error);
    res.status(401).send({ authError: error });
    // res.send({ error });
    next(error);
  }
});

//POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body);
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) {
      console.log(`${existingUser.email} already exists`);
      res.status(409).send('User already exists');
    } else {
      console.log('User is new.');
      // res.status(200).send('User is new');
      const newUser = await User.create(req.body);
      res.status(200).send({ token: await newUser.generateToken() });
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User Already Exists');
    } else {
      next(error);
    }
  }
});

//GET /auth/me
router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
