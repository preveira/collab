'use strict';

const io = require('socket.io-client');
const { assignTaskHandler, completeTaskHandler } = require('./handler')

const socket = io.connect('http://localhost:3000/tasks');

socket.emit('assignTask', {
  role: 'carpenter',
  task: { id: '2', description: 'Build frame for wall' },
});

socket.on('taskAssigned', (payload) => {
  assignTaskHandler(payload);
});

socket.emit('completeTask', {
  role: 'carpenter',
  taskId: '2',
});

socket.on('taskCompleted', (payload) => {
  completeTaskHandler(payload);
});

module.exports = socket;
