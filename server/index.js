'use strict';

const io = require('socket.io'); 
const { StandardQueue, FifoQueue } = require('./lib/queue'); 

const PORT = process.env.PORT || 3000; 


const server = new io.Server(PORT);
const taskNamespace = server.of('/tasks'); 

const generalContractorQueue = new FifoQueue('generalContractor');
const carpentersQueue = new StandardQueue('carpenters');
const plumbersQueue = new StandardQueue('plumbers');
const electriciansQueue = new StandardQueue('electricians');


taskNamespace.on('connection', (socket) => {
  console.log('A client has connected to the construction management system.');

 
  socket.on('assignTask', (payload) => {
    const { role, task } = payload;
    
    if (role === 'generalContractor') {
      generalContractorQueue.add(task);
    } else if (role === 'carpenter') {
      carpentersQueue.set(task.id, task);
    } else if (role === 'plumber') {
      plumbersQueue.set(task.id, task);
    } else if (role === 'electrician') {
      electriciansQueue.set(task.id, task);
    }
   
    taskNamespace.emit('taskAssigned', { role, task });
  });

  
  socket.on('completeTask', (payload) => {
    const { role, taskId } = payload;
    let completedTask;
    if (role === 'generalContractor') {
      completedTask = generalContractorQueue.getNext();
    } else if (role === 'carpenter') {
      completedTask = carpentersQueue.remove(taskId);
    } else if (role === 'plumber') {
      completedTask = plumbersQueue.remove(taskId);
    } else if (role === 'electrician') {
      completedTask = electriciansQueue.remove(taskId);
    }
   
    taskNamespace.emit('taskCompleted', { role, completedTask });
  });
});

module.exports = server; 
