// export {};

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//logging middleware
app.use(morgan('dev'));

//body-parsing middleware
app.use(express.json());

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
// export default app
