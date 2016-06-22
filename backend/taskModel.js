var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({  
  description: String,
  executionDate: String,
  creationDate: Date,
  userId: String,
  userName: String,
  userImage: String,
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;