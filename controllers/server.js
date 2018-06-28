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
      // find userId and add/save exercise to user profile
      Users.findOneAndUpdate({userId : req.body.userId
            }, {$push: { 'log': { description : req.body.description, duration : req.body.duration, date : req.body.date }}
            }, { safe: true, upsert: true, new: true }, ( (err, user) => {
              if(err) throw err;
              res.json({"Your exercise is logged": { "description": req.body.description, "duration" : req.body.duration + " min", "date": req.body.date} });
              })
            ); // end of .findOne()
    };
  
    
    this.printLog = (req, res) => {
      
      Users.find({ userId: req.query.userId}).select('log -_id').exec( (err, user) => {
        if(err) throw err;
        var log = user[0].log;
        let modify = (date) => Date.parse(new Date(date));
        let from = modify(req.query.from), to = modify(req.query.to), newLog = [];
         console.log(0);
        for(var i=0; i < log.length; i++) {
          let date = modify(log[i].date);
          if(date >= from && date <= to) {
            console.log(1)
            //log[i].date = log[i].date.toDateString()//.slice(0,10);
            delete log[i]._id;
            newLog.push(log[i])
          }   
        }

        newLog.sort((a, b) => modify(b.date) - modify(a.date) );

        res.json(newLog.slice(0, req.query.limit));
      });
      
    };
};

module.exports = ClickHandler;
 

//{"username":"Joel","userId":"Joel-R82uIB"}
// {"username":"Jeff","userId":"Jeff-Imarpb"}

// /api/exercise/log?Joel-R82uIB
// /api/exercise/log?Jeff-Imarpb
//  https://exercise-tracxer.glitch.me/api/exercise/log?userId=Jeff-Imarpb&from=2018-01-01&to=2018-07-01&limit=4