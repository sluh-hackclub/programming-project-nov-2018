const express = require('express');
const app = express();
const morgan = require('morgan');

const api = require('./api.js');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Send CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // amend with all allowed HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/', api);

module.exports = app;
