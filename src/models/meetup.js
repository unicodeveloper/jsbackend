'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupModel = new Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  attendees: { type: Number, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Meetup', meetupModel, 'meetups'); 