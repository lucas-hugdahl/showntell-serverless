const mongoose = require('mongoose');
var User = require('./models/user');
const passwordHash = require('password-hash');

mongoose.connect('mongodb+srv://lucas-admin:12345@cluster0-15rhl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
};

exports.handler = function(event, context, callback) {  
  const data = JSON.parse(event.body);
  User.find({username: data.username}, function(err, users) {
    if (!err) {
      if (users.length > 0) {
        if (passwordHash.verify(data.password, users[0].password)) {
          callback(null, {statusCode: 200, body: "User found: " + event.body, headers});
        } else {
          callback(null, {statusCode: 500,body: "Invalid username or password", headers});
        }
      } else {
        callback(null, {statusCode: 500,body: "Invalid username or password", headers});
      }
    } else {
      callback(null, {statusCode: 500,body: "Invalid username or password", headers});
    }
  });
}

