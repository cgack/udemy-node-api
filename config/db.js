var db = require('mongoose');

db.connect('mongodb://test:test@10.11.12.1:27017/workouts');

module.exports = db;
