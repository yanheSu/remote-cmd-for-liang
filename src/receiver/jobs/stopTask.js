const process = require('child_process');
const getTaskList = require('./checktask');
function stop(app) {
  const list = getTaskList();
  const rst = [];
  list.forEach(item => {
    if (item[0]) {
      const taskName = item[0].toLowerCase();
      const appName = app.toLowerCase();
      if (taskName.includes(appName)) {
        rst.push(item);
      }
    }
  });
  const len = rst.length;
  for (let i = 0; i < len; i++) {
    const task = rst[i];
    const taskId = task[1];
    killTask(taskId);
  }
}

function killTask(taskId) {
  console.log(taskId);
  const rst = process.execSync('TASKKILL /PID ' + taskId);
  console.log(rst.toString());
}

module.exports = stop;