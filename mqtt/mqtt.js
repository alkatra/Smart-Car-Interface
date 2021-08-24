const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
    
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://dbAdmin:dbAdmin@cluster0.2dme8.mongodb.net/mydb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });

const UsersM = require('./models/model');

const app = express();
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 5001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    client.subscribe('/sg-iot-project/exttemp');
    console.log('mqtt connected');
});

client.on('message', (topic, message) => {
    if (topic == '/sg-iot-project/exttemp') {
        const newtemp = JSON.parse(message);
        console.log(newtemp);

        UsersM.findOneAndUpdate({"username": "admin"}, {$set: {"externalTemp": newtemp}}).then(
            console.log("pushed")
        );
    }
    });

app.post('/send-command', (req, res) => {
    const { newtemp }  = req.body;
    const topic = `/sg-iot-project/exttemp`;
    client.publish(topic, newtemp, () => {
      res.send('published new message');
    });
});

app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});