const mongoose = require('mongoose');
const setupRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authenticate');

function init(config) {
  const {
    app,
    secret,
    mongoURI,
    firebaseConfig,
    userSchemaOptions = {},
    basePath = '/auth'
  } = config;

  if (!app || !secret) {
    throw new Error('Hedgehod 🦔: "app" and "secret" are required in config.');
  }

  if (mongoURI) {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('[Hedgehod 🦔] MongoDB connected'))
    .catch((err) => console.error('[Hedgehod 🦔] MongoDB connection error:', err));
  }

  setupRoutes(app, { secret, basePath });
  console.log('[Hedgehod 🦔] Initialized');
}

module.exports = {
  init,
  authenticate
};
