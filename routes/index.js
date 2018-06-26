'use strict';

module.exports = function(app) {
  
  app.route('/api/exercise/:new-user')
      .post( (req, res) => {
        console.log(req.body, req.path)
      });
  
  app.route('/api/exercise/:add')
  app.post('/api/exercise/:add', (req, res) => {
        console.log(req.body);
      });
  
  
};