'use strict';

const io = require('socket.io-client'); 
const { assignTaskHandler, completeTaskHandler } = require('./handler');

const socket = io.connect('http://localhost:3000/tasks'); 


socket.emit('assignTask', {
  role: 'generalContractor',
  task: { id: '1', description: 'Project Planning' },
});


socket.on('taskAssigned', (payload) => {
  assignTaskHandler(payload); 
});


socket.emit('completeTask', {
  role: 'generalContractor',
  taskId: '1',
});


socket.on('taskCompleted', (payload) => {
  completeTaskHandler(payload); 
});

module.exports = socket;
