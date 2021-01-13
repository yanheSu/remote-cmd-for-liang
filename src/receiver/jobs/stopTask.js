const process = require('child_process');
const getTaskList = require('./checktask');
function stop(app) {
  const list = getTaskList();
  if (!app[0]) {
    return ;
  }
  const appName = app[0].toLowerCase();
  console.log(appName);
  const rst = [];
  list.forEach(item => {
    if (item[0]) {
      const taskName = item[0].toLowerCase();
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
  try {
    console.log(taskId);
    const rst = process.execSync('TASKKILL /PID ' + taskId + ' /F');
    console.log(rst.toString());
  } catch (e) {
    console.log(e);
  }
}

module.exports = stop;
