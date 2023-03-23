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
