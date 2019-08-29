const mongoose = require('mongoose');
const User = require('./models/user');
const passwordHash = require('password-hash');
import CONSTANTS from './config/CONSTANTS';
mongoose.connect(CONSTANTS.DATABASE_AUTH, {useNewUrlParser: true});

exports.handler = function(event, context, callback) {  
  const data = JSON.parse(event.body);
  
  testUser(data)
  .then((res) => {
    return createUser(data)
  }).then((res) => {
    callback(null, {statusCode: 200, body: JSON.stringify(data), headers: CONSTANTS.HEADERS});
  })
  .catch(err => {
    callback(null, {statusCode: 500, body: err || "Please try again", headers: CONSTANTS.HEADERS});
  });
}

function createUser(data) {
  return new Promise((resolve, reject) => {
    data.password = passwordHash.generate(data.password);
    var NewUser = new User(data);
    NewUser.save(function(err) {
      if (!err) {
        resolve("Success");
      } else {
        reject();
      }
    });
  });
}

function testUser(data) {
  return new Promise((resolve, reject) => {
    if (data.username && data.name && data.password) {
      User.find({username: data.username}, function(err, users) {
        if (!err) {
          if (users.length < 1) {
            resolve("Success");
          } else {
            reject("Username already taken");
          }
        } else {
          reject();
        }
      });
    } else {
      reject("Fill in all fields");
    }
  });
}