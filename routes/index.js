'use strict';
var path = process.cwd();
var ClickHandler = require(path + '/controllers/server.js');


module.exports = (app) => {
  
  function checkRoute(req, res, next) {
    console.log(req.path, req.method)
    let route = 'api/exercise';
    //req.path === route + '/new-user' == clickHandler
  }
  
  let clickHandler = new ClickHandler();
  
  app.route('/')
		 .get( (req, res) => {
		     res.sendFile(path + '/views/index.html');
	  });
  
  app.route('/api/exercise/:path')
  .get(checkRoute, clickHandler.printLog)
  .post(checkRoute, clickHandler.addUser)
  .post(checkRoute, clickHandler.logExercise);
  /*
  app.route('/api/exercise/new-user')
     .post(clickHandler.addUser);
  
  
  app.route('/api/exercise/add')
     .post(clickHandler.logExercise);
  */
  // Error Handling middleware
  app.use((err, req, res, next) => {
    let errCode, errMessage

    if (err.errors) {
      // mongoose validation error
      errCode = 400 // bad request
      const keys = Object.keys(err.errors)
      // report the first validation error
      errMessage = err.errors[keys[0]].message
    } else {
      // generic or custom error
      errCode = err.status || 500
      errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
      .send(errMessage)
  })
  
};