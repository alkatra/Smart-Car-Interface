const express = require('express');
const app = express();
const fetch = require('node-fetch');

const port = 3000;
const base = `${__dirname}/public`;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${base}/login.html`);
});

app.get('/signup', (req, res) => {
    res.sendFile(`${base}/register.html`);
});

app.get('/success', (req, res) => {
    res.sendFile(`${base}/success.html`);
});

app.get('/addroom', (req, res) => {
    res.sendFile(`${base}/addroom.html`);
});

app.get('/carpage', (req, res) => {
    res.sendFile(`${base}/carpage.html`);
})

app.get('/roompage', (req, res) => {
    res.sendFile(`${base}/roompage.html`);
})

app.get('/changetemp', (req, res) => {
    res.sendFile(`${base}/exttempchange.html`);
})

app.get('*', (req,res) => {
    res.sendFile(`${base}/404.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

