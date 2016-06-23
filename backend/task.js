'use strict';
var Task = require('./taskModel.js');
var moment = require('moment');

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
    var today = moment().startOf('day');
    var yesterday = moment(today).add(-1, 'days');    
    today = today.hour(20);
    yesterday = yesterday.hour(20);
    console.log(yesterday.format('DD/MM/YYYY HH:mm'));
    console.log(today.format('DD/MM/YYYY HH:mm'));
        
    Task.find({creationDate: { $gte: yesterday.toDate(),$lt: today.toDate() }}, function(err, tasks) {
        var result=[];
        if(!err){
          result=tasks;
        }   
        res.setHeader('Content-Type', 'application/json');       
        res.send(result);     
    });   
  });

  app.get('/api/task/descriptions',function(req, res){
    Task.find().distinct('description', function(err, descriptions) {
        var result=[];
        if(!err){
          result=descriptions;
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
    dbTask.creationDate=moment();
    dbTask.save(function(err) {      
    });
    res.setHeader('Content-Type', 'application/json');       
    res.send(newTask); 
  });  
  return require('express').Router();
};