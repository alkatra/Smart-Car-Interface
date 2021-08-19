var userDB = require('../models/model');

exports.addRoom = (req,res) => {{
    username =  req.body.username_;
    newroom = req.body.newroom;
    userDB.findOneAndUpdate({"username": username}, {$push: {"rooms": newroom}}).then(res.status(200).send({message: `dones`}));
}}

exports.addCar = (req,res) => {{
    username =  req.body.username_;
    newcar = req.body.newcar;
    userDB.findOneAndUpdate({"username": username}, {$push: {"cars": newcar}}).then(res.status(200).send({message: `dones`}));
}}

