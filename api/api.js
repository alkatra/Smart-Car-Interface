const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin:dbAdmin@cluster0.2dme8.mongodb.net/mydb?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});

const UsersM = require('./models/model');

const app = express();

const bodyParser = require('body-parser');

const Controller = require('./controller/controller');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {get} /api/users Get all Users
* @apiGroup Users
* @apiSuccessExample {json} Success-Response:
*  [
    {
        "rooms": [
            {
                "roomName": "Living Room",
                "climSetting": 24,
                "lights": [
                    {
                        "Name": "Table Tamp",
                        "Color": "seagreen"
                    }
                ]
            },
            {
                "roomName": "Dining Room",
                "climSetting": 24,
                "lights": []
            }
        ],
        "cars": [
            {
                "carName": "Tesla Model S",
                "climSetting": "24",
                "seatSetting": "0",
                "lightColor": "lightblue",
                "workAddress": "16 Poplar St, Box Hill"
            }
        ],
        "_id": "6129b6b66396c84071717c1a",
        "username": "Sagar",
        "__v": 0
    }
]
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.get('/api/users', (req, res) => {
    UsersM.find({}, (err, users) => {
        return err
        ? res.send(err)
        : res.send(users);
    });
});

/**
* @api {post} /api/users Post a new User
* @apiGroup Users
* @apiParam {json} body username, password, climSetting, rooms
* @apiSuccessExample {json} Success-Response:
*  "successfully added new user"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users', (req, res) => {
    const { username,password,climSetting,rooms} = req.body;
    const newUser = new UsersM({
        username,
        password,
        climSetting,
        rooms
    });
    newUser.save(err => {
        return err
        ? res.send(err)
        : res.send('successfully added new user');
    });
});

/**
* @api {post} /api/users/update/car/color Change color of car
* @apiGroup Cars Modification
* @apiParam {json} body username_, carName_, newcolor
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/update/car/color', Controller.changeCarColor); 

/**
* @api {post} /api/users/update/cars Add a new car
* @apiGroup Cars Modification
* @apiParam {json} body username_, carName, climSetting, seatSetting, lightColor, workAddress
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/update/cars', Controller.addCar); 

/**
* @api {post} /api/users/update/seat Adjust seat-setting of Car
* @apiGroup Cars Modification
* @apiParam {json} body carName_, username_, newsetting
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/update/seat', Controller.updateSeat);

/**
* @api {post} /api/users/update/temp Adjust climate setting of Car
* @apiGroup Cars Modification
* @apiParam {json} body carName_, username_, newtemp
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/update/temp', Controller.updateTemp); 

/**
* @api {post} /api/users/update/room/color Adjust color of light in room
* @apiGroup Rooms Modification
* @apiParam {json} body username_, lightName, roomname_, newcolor
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/update/room/color', Controller.changeRoomColor); 

/**
* @api {post} /api/users/add/rooms Add a new room to list of rooms
* @apiGroup Rooms Modification
* @apiParam {json} body username_, roomname
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/add/rooms', Controller.addRoom); 

/**
* @api {post} /api/users/update/roomtemp Adjust climate setting in room
* @apiGroup Rooms Modification
* @apiParam {json} body roomname_, username_, newtemp
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/update/roomtemp', Controller.changeRoomTemp);

/**
* @api {post} /api/users/add/light Add a light inside the room
* @apiGroup Rooms Modification
* @apiParam {json} body username_, lightName, roomname_
* @apiSuccessExample {json} Success-Response:
*  "done"
* @apiErrorExample {json} Error-Response:
*  {
*    "Error Message"
*  }
*/
app.post('/api/users/add/light', Controller.addLight); 

/**
* @api {get} /api/test Test the API
* @apiGroup Test
* @apiSuccessExample {json} Success-Response:
*  The API is working!
*/
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
}); //works

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});