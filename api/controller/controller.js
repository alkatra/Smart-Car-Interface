var userDB = require('../models/model');

exports.addRoom = (req,res) => {{
    username =  req.body.username_;
    newroom = req.body.newroom;
    userDB.findOneAndUpdate({"username": username}, {$push: {"rooms": newroom}}).then(res.status(200).send({message: `dones`}));
}}

