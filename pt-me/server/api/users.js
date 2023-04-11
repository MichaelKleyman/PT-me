const router = require('express').Router();
const { User } = require('../db/index');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'clinicname'],
    });
    res.send(users);
    console.log(users);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // console.log(req.body);
    await User.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
