'use strict';

module.exports = function(app) {
  app.put('/api/task/:id',function(req, res){
    console.log(req.body);  
    res.setHeader('Content-Type', 'application/json');       
    res.send(req.body);    
  });

  app.get('/api/task',function(req, res){
    console.log('get tasks');  
    res.setHeader('Content-Type', 'application/json');       
    res.send('{}'); 
  });
  
  return require('express').Router();
};