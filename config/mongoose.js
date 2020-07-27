'use strict';
const env = require('./environment/development');
const mongoose = require('mongoose');
const dbURL = 'mongodb://' + env.host + ':' + env.dbPort+ '/' + env.database;
mongoose.connect(dbURL, { useNewUrlParser: true });

module.exports = mongoose;