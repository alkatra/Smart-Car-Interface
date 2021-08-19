const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin:dbAdmin@cluster0.2dme8.mongodb.net/mydb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });

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

const port = 5000;

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
}); //works

app.get('/api/users', (req, res) => {
    UsersM.find({}, (err, users) => {
    return err
    ? res.send(err)
    : res.send(users);
});
});

app.get('/api/users/address', (req, res) => {
    UsersM.find({addresses}, (err, users) => {
    return err
    ? res.send(err)
    : res.send(users);
});
});

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

// app.post('/api/users/update/temp', Controller.updateTemp); 
// app.post('/api/users/update/seat', Controller.updateSeat); 
// app.post('/api/users/update/address', Controller.addAddress); 
// app.post('/api/users/update/color', Controller.changeColor); 
 
app.post('/api/users/update/rooms', Controller.addRoom); 
app.post('/api/users/update/cars', Controller.addCar); 

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
  