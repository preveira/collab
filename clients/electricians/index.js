'use strict';

const io = require('socket.io-client'); 
const { assignTaskHandler, completeTaskHandler } = require('./handler'); 

const socket = io.connect('http://localhost:3000/tasks');

socket.emit('assignTask', {
  role: 'electrician',
  task: { id: '4', description: 'Install electrical wiring' },
});

socket.on('taskAssigned', (payload) => {
  assignTaskHandler(payload);
});

socket.emit('completeTask', {
  role: 'electrician',
  taskId: '4',
});

socket.on('taskCompleted', (payload) => {
  completeTaskHandler(payload);
});

module.exports = socket;
