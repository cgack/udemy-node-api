var express = require('express');
var app = express();
var db = require('mongoose');
var bodyParser = require('body-parser');


db.connect('mongodb://test:test/10.12.13.1:27017/workouts');

var UserSchema = db.Schema({
  username: String,
  passhash: String,
  created: { type: Date, default: Data.now }
});

var User = db.model('User', UserSchema);

app.post('/user', (req, res) => {
    // req has some body properties that have a username and pwd
    var username = req.body.user.username; // user: { username: 'blah', password: 'boo' }
    var pass = req.body.user.password; // TODO: encrypt/hash this

    var user = new User({
      username: username,
      passhash: ""// hash pass
    });

    user.save().then((user) => {
        res.json({
          user: user,
          message: 'created'
        });
    }, (err) => {
        res.send(500, err.message);
    });
});

app.use('/test', function(req, res) {
    res.send('hello world');
});

app.listen(3000, function() {
    console.log('app is listening on port 3000...');
});
