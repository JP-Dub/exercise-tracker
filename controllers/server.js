'use strict';
var path = process.cwd();
var Users = require(path + '/models/users.js');
var str = "abcde0fghij1klmno2pqrst3uvwxy4zABCD5EFGHI6JKLMN7OPQRS8TUVWX9YZ";  // string hash for random()


for (var i = 0; i < 6; i++) {
  short += str[Math.floor(Math.random() * str.length)];
  }


function ClickHandler ()  {
  
    this.addUser = () => {
      
    }
    
    
};

module.exports = ClickHandler;