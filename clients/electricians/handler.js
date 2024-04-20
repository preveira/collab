'use strict';

function assignTaskHandler(payload) {
  const { role, task } = payload;
  console.log(`Task assigned to ${role}:`, task);
}

function completeTaskHandler(payload) {
  const { role, completedTask } = payload;
  console.log(`Task completed by ${role}:`, completedTask);
}

module.exports = {
  assignTaskHandler,
  completeTaskHandler,
};
