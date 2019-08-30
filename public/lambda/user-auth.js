const mongoose = require('mongoose');
const User = require('./models/user');
const passwordHash = require('password-hash');
const CONSTANTS = require('./config/CONSTANTS');
mongoose.connect(CONSTANTS.DATABASE_AUTH, {useNewUrlParser: true});

exports.handler = function(event, context, callback) {  
  const data = JSON.parse(event.body);
  testAuth(data)
  .then(user => {
    callback(null, {statusCode: 200, body: JSON.stringify(user), headers: CONSTANTS.HEADERS});
  }).catch(err => {
    callback(null, {statusCode: 500,body: err || "Please try again", headers: CONSTANTS.HEADERS});
  });
}

function testAuth(data) {
  return new Promise((resolve, reject) => {
    User.find({username: data.username}, function(err, users) {
      if (!err) {
        if (users.length > 0) {
          if (passwordHash.verify(data.password, users[0].password)) {
            resolve(users[0])
          } else {
            reject("Invalid username or password")
          }
        } else {
          reject("Invalid username or password")
        }
      } else {
        reject();
      }
    });
  });
}

