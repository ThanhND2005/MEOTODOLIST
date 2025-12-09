const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    delete : String,
    username : String,
},
{
    timestamps: true,
})

const Task = mongoose.model('tasks',taskSchema);

module.exports = Task;