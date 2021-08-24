const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
  username: String,
  password: String,
  rooms: Array,
  cars: Array,
  externalTemp: String
}, { collection : 'individual-project' }));
