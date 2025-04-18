const express = require('express');
const app = express();
const accountRoutes = require('./routes/accountRoute');
const bodyParser = require('body-parser');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use account routes
app.use('/account', accountRoutes);

// Other route definitions...
