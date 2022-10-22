require('dotenv').config();

const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  const BUILD_PATH = path.join(__dirname, 'public' , 'client','build');
  app.use(express.static(BUILD_PATH));
  app.get('*', (req, res) => res.sendFile(path.join(BUILD_PATH, 'index.html')));
}

require('./api/controllers/index')(app);

module.exports = app;
