const process = require('child_process');
process.execSync('git pull origin main');

function getTaskList() {
  const taskList = process.execSync('tasklist', { encoding: 'utf8' }).toString();
  const taskArr = taskList.split('\r\n').map(item => item.split(' ').filter(dItem => dItem !== ''));
  return taskArr;
}
module.exports = getTaskList;
