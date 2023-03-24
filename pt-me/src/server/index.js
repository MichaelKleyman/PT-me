// export {};

const express = require('express');
const app = express();
const morgan = require('morgan');
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const myApp = next({ dev });
const bodyParser = require('body-parser');

//.prepares the nextjs code to use another server which in this case is express, for handing SSR.
myApp.prepare().then(() => {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  const cors = require('cors');

  app.options(
    '*',
    cors({ origin: 'http://localhost:3002', optionsSuccessStatus: 200 })
  );

  app.use(cors({ origin: 'http://localhost:3002', optionsSuccessStatus: 200 }));

  //logging middleware
  app.use(morgan('dev'));

  //body-parsing middleware
  app.use('/api', require('./api'));

  app.get('/api', (req, res) => {
    res.json({ users: ['userOne', 'userTwo'] });
  });

  // error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });
});

module.exports = app;
// export default app
