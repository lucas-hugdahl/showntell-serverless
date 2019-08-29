const mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect('mongodb+srv://lucas-admin:12345@cluster0-15rhl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const headers = {
  'Content-Type': 'application/json', 
  'Access-Control-Allow-Origin': '*' 
};

exports.handler = function(event, context, callback) {  
  const data = JSON.parse(event.body);
  var NewUser = new User(data);

  User.find({username: data.username}, function(err, users) {
    if (!err) {
      if (users.length > 0) {
        callback(null, {statusCode: 500,body: "Username already taken", headers});
      } else {
        NewUser.save(function(err) {
          if (err) throw err;
          callback(null, {statusCode: 200,body: "User created: " + event.body, headers});
        });
      }
    } else {
      callback(null, {statusCode: 500, body: "Please try again", headers});
    }
  });
}