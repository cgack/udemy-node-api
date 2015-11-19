var db = require('../config/db.js');

var UserSchema = db.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  passhash: {type: String, required: true},
  created: {type: Date, default: Date.now}
});



UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.passhash;
    delete obj.__v;
    return obj;
};

module.exports = UserSchema;
