'use strict';
var path = process.cwd();
var Users = require(path + '/models/users.js');
var str = "abcde0fghij1klmno2pqrst3uvwxy4zABCD5EFGHI6JKLMN7OPQRS8TUVWX9YZ";  // string hash for random()





function ClickHandler ()  {
  
    this.addUser = (req, res) => {
      
      Users.find(req.body, (err, user) => {
        if(err) throw err;
        console.log(user)
        
        if(!user) {
          // create random 6 alphanum
          let password = req.body.username + '-';    
          for (var i = 0; i < 6; i++) {
            password += str[Math.floor(Math.random() * str.length)];
          }
          
          var newUser = new Users();
          newUser.username = req.body.username;
          newUser.userId = password;
        
          newUser.save( err => {
            if(err) throw err;
            res.json({username: req.body.username, userId : password});
          }, {returnOriginal : false});

        } else {
          let username = user.username;
          res.json({username : 'username already exists. Try another username please!'});
        }
      });
    }
    
    this.logExercise = (req, res) => {
    };
};

module.exports = ClickHandler;
      
      