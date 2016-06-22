'use strict';
var Task = require('./taskModel.js');

module.exports = function(app) {
  app.put('/api/task/:id',function(req, res){
    var newTask=req.body;
    var id=req.params.id;
    Task.findByIdAndUpdate(id, newTask, function(err, task) {      
    });
    res.setHeader('Content-Type', 'application/json');       
    res.send(newTask);    
  });

  app.get('/api/task',function(req, res){
    Task.find({}, function(err, tasks) {
        var result=[];
        if(!err){
          result=tasks;
        }   
        res.setHeader('Content-Type', 'application/json');       
        res.send(result);     
    });   
  });

  app.delete('/api/task/:id',function(req, res){
    var id=req.params.id;
    Task.findByIdAndRemove(id, function(err) {   
    });
    res.send();   
  });

  app.post('/api/task',function(req, res){
    var newTask=req.body;
    var dbTask=new Task(newTask);  
    dbTask.save(function(err) {      
    });
    res.setHeader('Content-Type', 'application/json');       
    res.send(newTask); 
  });
  
  return require('express').Router();
};