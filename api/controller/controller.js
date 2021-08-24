var userDB = require('../models/model');

exports.addRoom = (req,res) => {{
    username =  req.body.username_;
    newroom = req.body.newroom;
    userDB.findOneAndUpdate({"username": username}, {$push: {"rooms": newroom}}).then(res.status(200).send({message: `dones`}));
}}

exports.addCar = (req,res) => {{
    username =  req.body.username_;
    carName = req.body.carName;
    climSetting = req.body.climSetting;
    seatSetting = req.body.seatSetting;
    lightColor = req.body.lightColor;
    workAddress = req.body.workAddress;
    userDB.findOneAndUpdate({"username": username}, {$push: {"cars": {
        "carName": carName,
        "climSetting": climSetting,
        "seatSetting": seatSetting,
        "lightColor": lightColor,
        "workAddress": workAddress
    }}}).then(res.status(200).send({message: `dones`}));
}}

exports.updateTemp = (req,res) => {{
    carName = req.body.carName_;
    username =  req.body.username_;
    newtemp = req.body.newtemp;
    userDB.findOneAndUpdate({"username": username, "cars.carName": carName}, {$set: {"cars.$.climSetting": newtemp}}).then(
        res.status(200).send({message: `done`}));
}}

exports.updateSeat = (req,res) => {{
    carName = req.body.carName_;
    username =  req.body.username_;
    newsetting = req.body.newsetting;
    userDB.findOneAndUpdate({"username": username, "cars.carName": carName}, {$set: {"cars.$.seatSetting": newsetting}}).then(
        res.status(200).send({message: `done`}));
}}

exports.changeColor = (req,res) => {{
    carName = req.body.carName_;
    username =  req.body.username_;
    newcolor = req.body.newcolor;
    userDB.findOneAndUpdate({"username": username, "cars.carName": carName}, {$set: {"cars.$.lightColor": newcolor}}).then(
        res.status(200).send({message: `done`}));
}}

exports.changeExternalTemp = (req,res) => {{
    username = req.body.username_;
    newtemp = req.body.newtemp;
    userDB.findOneAndUpdate({"username": username}, {$set: {"externalTemp": newtemp}}).then(
        res.status(200).send({message: `done`}));
}}

