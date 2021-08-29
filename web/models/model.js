const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String,
    rooms: Array,
    cars: Array,
    externalTemp: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('Users', UserDetail, 'individual-project');
 
module.exports = UserDetails;
