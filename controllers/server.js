'use strict';
var path = process.cwd();
var Users = require(path + '/models/users.js');
var str = "abcde0fghij1klmno2pqrst3uvwxy4zABCD5EFGHI6JKLMN7OPQRS8TUVWX9YZ";  // string hash for random()


function ClickHandler ()  {
  
    this.addUser = (req, res) => {
      
      Users.findOne(req.body, (err, user) => {
        if(err) throw err;

        if(user) {
          // user already exists
          console.log(user)
          let username = user.username;
          res.json({username : 'username already exists. Try another username please!'});

        } else {
          // create random 6 alphanumeric string
          let password = req.body.username + '-';    
          for (var i = 0; i < 6; i++) {
            password += str[Math.floor(Math.random() * str.length)];
          }
          // create new user
          var newUser = new Users();
          newUser.username = req.body.username;
          newUser.userId = password;
          // save new user
          newUser.save( err => {
            if(err) throw err;
            res.json({username: req.body.username, userId : password});
          }, {returnOriginal : false});  
        }
        
      }); //end of .findOne()
    }
    
    this.logExercise = (req, res) => {
      
      Users.findOneAndUpdate({userId : req.body.userId},
                    {$push: { 'log': { description : req.body.description, duration : req.body.duration, date : req.body.date }}
                    }, { safe: true, upsert: true, new: true }, ( (err, user) => {
                    if(err) throw err;

  
          res.json({"Your exercise is logged": { "description": req.body.description, "duration" : req.body.duration + " min", "date": req.body.date} });
          })
        
      ); // end of .findOne()
      
    };
  
    this.printLog = (req, res) => {
      //console.log(req.query, req.params)
      Users.findOne({_id: '5b339aaaed62521c188f9501'}, (err, user) => {
        if(err) throw err;
        console.log(user)
        res.json(user);
      });
      
    };
};

module.exports = ClickHandler;
 

//{"username":"Joel","userId":"Joel-R82uIB"}
//{"username":"Jeff","userId":"Jeff-4LRYcY"}
//Jeff-4LRYcY
///api/exercise/log?
// /api/exercise/log?Jeff-4LRYcY