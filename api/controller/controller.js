var userDB = require('../models/model');

exports.addRoom = (req,res) => {{
    username =  req.body.username_;
    roomName = req.body.roomname;
    climSetting = 24;
    lights = [];
    try {
        userDB.findOneAndUpdate({"username": username}, {$push: {"rooms": {
            "roomName": roomName,
            "climSetting": climSetting,
            "lights": lights
        }}}).then(res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.addCar = (req,res) => {{
    username =  req.body.username_;
    carName = req.body.carName;
    climSetting = req.body.climSetting;
    seatSetting = req.body.seatSetting;
    lightColor = req.body.lightColor;
    workAddress = req.body.workAddress;
    try {
        userDB.findOneAndUpdate({"username": username}, {$push: {"cars": {
            "carName": carName,
            "climSetting": climSetting,
            "seatSetting": seatSetting,
            "lightColor": lightColor,
            "workAddress": workAddress
        }}}).then(res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.updateTemp = (req,res) => {{
    carName = req.body.carName_;
    username =  req.body.username_;
    newtemp = req.body.newtemp;
    try {
        userDB.findOneAndUpdate({"username": username, "cars.carName": carName}, {$set: {"cars.$.climSetting": newtemp}}).then(
            res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.updateSeat = (req,res) => {{
    carName = req.body.carName_;
    username =  req.body.username_;
    newsetting = req.body.newsetting;
    try {
        userDB.findOneAndUpdate({"username": username, "cars.carName": carName}, {$set: {"cars.$.seatSetting": newsetting}}).then(
            res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.changeCarColor = (req,res) => {{
    carName = req.body.carName_;
    username =  req.body.username_;
    newcolor = req.body.newcolor;
    try {
        userDB.findOneAndUpdate({"username": username, "cars.carName": carName}, {$set: {"cars.$.lightColor": newcolor}}).then(
            res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.changeRoomColor = (req,res) => {{
    username = req.body.username_;
    lightName = req.body.lightName;
    roomname = req.body.roomname_;
    newcolor = req.body.newcolor;
    try {
    userDB.findOneAndUpdate(
        {"username": username, "rooms.roomName": roomname}, 
        {
            $set: 
            {
                "rooms.$.lights.$[element]": {
                    "Name": lightName,
                    "Color": newcolor
                }
            }
        },
        {
            arrayFilters: [{
                "element.Name": lightName
            }]
        }
    ).then(
        res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.changeRoomTemp = (req,res) => {{
    roomname = req.body.roomname_;
    username =  req.body.username_;
    newtemp = req.body.newtemp;
    try {
        userDB.findOneAndUpdate({"username": username, "rooms.roomName": roomname}, {$set: {"rooms.$.climSetting": newtemp}}).then(
            res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}

exports.addLight = (req,res) => {{
    username = req.body.username_;
    lightName = req.body.lightName;
    roomname = req.body.roomname_;
    try {
        userDB.findOneAndUpdate({"username": username, "rooms.roomName": roomname}, {$push: {"rooms.$.lights": {
            "Name": lightName,
            "Color": "lightblue"
        }}}).then(
            res.status(200).send({message: `done`}));
    } catch(e) {
        res.status(400).send({message: e})
    }
}}