const express = require('express');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin:dbAdmin@cluster0.2dme8.mongodb.net/mydb?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


const UsersM = require('./models/model');

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

passport.use(UsersM.createStrategy());

passport.serializeUser(UsersM.serializeUser());
// passport.deserializeUser(UsersM.deserializeUser());

// const port = 3000;
const base = `${__dirname}/public`;

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressSession);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

const connectEnsureLogin = require('connect-ensure-login');

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.redirect('/login?info=' + info);
      }
  
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        if(user.username == "admin") {
            return res.redirect(`/signup`);
        }
        return res.redirect(`/success?user=${user.username}`);
      });
  
    })(req, res, next);
  });

app.get('/login',
  (req, res) => {
      res.sendFile(`${base}/login.html`)}
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

app.get('/', (req, res) => {
    res.sendFile(`${base}/login.html`);
});

app.get('/signup', (req, res) => {
    res.sendFile(`${base}/register.html`);
});

app.get('/success', (req, res) => {
    res.sendFile(`${base}/success.html`);
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

app.post('/signup/user', (req, res) => {
    const { username_,password_,climSetting,rooms} = req.body;
    UsersM.register(
        {
            username: username_,
            active: false
        },
        password_
    )
});

app.get('*', (req,res) => {
    res.sendFile(`${base}/404.html`);
});


app.listen(process.env.PORT || 3000);