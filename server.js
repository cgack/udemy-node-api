var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.json());

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'this is a secret'
}));

app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use((req, res, next) => {
  if (req.body.user) {
      next();
  } else {
    if (req.session.user) {
      next();
    } else {
      res.send(401, 'unauthorized');
    }
  }
});

app.use('/test', function(req, res) {
    res.send('hello world');
});

app.use('/api/users', require('./routes/users'));

app.listen(3000, function() {
    console.log('app is listening on port 3000...');
});
