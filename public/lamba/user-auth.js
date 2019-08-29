const mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect('mongodb+srv://lucas-admin:12345@cluster0-15rhl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

exports.handler = function(event, context, callback) {  
  const data = JSON.parse(event.body);
  User.find({username: data.username}, function(err, users) {
    if (!err) {
      if (users.length > 0) {
        if (users[0].password == data.password) {
          callback(null, {statusCode: 200, body: "User found: " + event.body
          });
        } else {
          callback(null, {statusCode: 500,body: "Invalid username or password"});
        }
      } else {
        callback(null, {statusCode: 500,body: "Invalid username or password"});
      }
    } else {
      callback(null, {statusCode: 500,body: "Invalid username or password"});
    }
  });
}

