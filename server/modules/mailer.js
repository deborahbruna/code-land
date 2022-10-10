const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const assert = require('assert');

assert(process.env.EMAIL_HOST, "Missing EMAIL_HOST environment variable ")
const EMAIL_HOST = process.env.EMAIL_HOST;

assert(process.env.EMAIL_PORT, "Missing EMAIL_PORT environment variable ")
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT);

assert(process.env.EMAIL_USER, "Missing EMAIL_USER environment variable ")
const EMAIL_USER = process.env.EMAIL_USER;

assert(process.env.EMAIL_PASS, "Missing EMAIL_PASS environment variable ")
const EMAIL_PASS = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

transport.use('compile', hbs({
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/resources/mail'),
  extName: '.html'
}));

module.exports = transport;