// export {};

const express = require('express');
const app = express();
const morgan = require('morgan');
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const myApp = next({ dev });

myApp.prepare().then(() => {
  app.use(morgan('dev'));
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

// //logging middleware
// app.use(morgan('dev'));

// //body-parsing middleware
// app.use(express.json());

// app.use('/api', require('./api'));

// // app.get('/api', (req, res) => {
// //   res.json({ users: ['userOne', 'userTwo'] });
// // });

// //error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   console.error(err.stack);
//   res.status(err.status || 500).send(err.message || 'Internal server error');
// });

module.exports = app;
// export default app
