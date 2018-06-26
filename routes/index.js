'use strict';

module.exports = function(app) {
  
  app.route('/api/exercise/new-user/:name')
      .post( (req, res) => {
        console.log(req.params, req.path, req.body.name)
      });
  
  
  app.route('/api/exercise/add')
     .post( (req, res) => {
        console.log(req.body);
      });
  
  
};