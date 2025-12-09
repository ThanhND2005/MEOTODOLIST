const taskController = require('../controllers/taskController');
const express = require('express');
const route = express.Router();

route.get('/',taskController.getTasks);
route.post('/create',taskController.createTask);
route.get('/completedTask',taskController.getCompletedTasks)
route.patch('/completed/:id',taskController.softDeleteTask);

module.exports = route;