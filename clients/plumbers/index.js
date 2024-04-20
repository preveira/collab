'use strict';

const io = require('socket.io-client'); 
const { assignTaskHandler, completeTaskHandler } = require('./handler');

const socket = io.connect('http://localhost:3000/tasks');

socket.emit('assignTask', {
  role: 'plumber',
  task: { id: '3', description: 'Install plumbing fixtures' },
});

socket.on('taskAssigned', (payload) => {
  assignTaskHandler(payload);
});

socket.emit('completeTask', {
  role: 'plumber',
  taskId: '3',
});

socket.on('taskCompleted', (payload) => {
  completeTaskHandler(payload);
});

module.exports = socket;
