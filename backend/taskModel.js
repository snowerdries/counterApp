var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({  
  description: String,
  executionDate: String
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;