const express = require('express');
const signup = require('../controllers/auth/signup');
const signin = require('../controllers/auth/signin');
const forgotPassword = require('../controllers/auth/forgotPassword');
const resetPassword = require('../controllers/auth/resetPassword');

function setupRoutes(app, { secret, basePath }) {
  const router = express.Router();

  app.set('Hedgehod 🦔_secret', secret);

  router.post('/signup', signup);
  router.post('/signin', signin);
  router.post('/forgot-password', forgotPassword);
  router.post('/reset-password', resetPassword);

  app.use(basePath, router);
}

module.exports = setupRoutes;
