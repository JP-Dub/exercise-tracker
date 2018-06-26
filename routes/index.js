'use strict';
var path = process.cwd();

module.exports = (app) => {
  
  app.route('/')
		 .get( (req, res) => {
		     res.sendFile(path + '/views/index.html');
		});
  
  app.route('/api/exercise/new-user')
      .post( (req, res) => {
        console.log(req.params, req.path, req.body)
      });
  
  
  app.route('/api/exercise/add')
     .post( (req, res) => {
        console.log(req.body);
      });
  
  
};