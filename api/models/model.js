const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
  username: String,
  password: String,
  climSetting: String,
  rooms: Array,
  cars: Array
}, { collection : 'individual-project' }));
