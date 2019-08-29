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
  console.log(event)
  const data = JSON.parse(event.body);


  User.find({username: data.username}, function(err, users) {
    if (!err) {
      if (users.length > 0) {
        callback(null, {statusCode: 500, body: "Username already taken", headers});
      } else {
        if (data.username && data.name && data.password) {
          data.password = passwordHash.generate(data.password);
          var NewUser = new User(data);
          NewUser.save(function(err) {
            if (err) throw err;
            callback(null, {statusCode: 200,body: "User created: " + event.body, headers});
          });
        } else {
          callback(null, {statusCode: 500, body: "Fill in all fields", headers});
        }
      }
    } else {
      callback(null, {statusCode: 500, body: "Please try again", headers});
    }
  });
}