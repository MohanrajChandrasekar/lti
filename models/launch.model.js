'use strict';
var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

const launchResponse = new Schema({
    response: {
        type: Object,
        required: true
    },
    responseAt: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model('ltiLaunchResponse', launchResponse, 'ltiLaunchResponse');
exports.model = model;