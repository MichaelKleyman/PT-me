const router = require('express').Router();
const clinicRouter = require('./clinic');

router.use('/clinic', clinicRouter);

module.exports = router;
