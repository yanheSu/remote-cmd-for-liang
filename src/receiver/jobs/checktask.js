const iconv = require('iconv-lite');
const process = require('child_process');

function getTaskList() {
  const taskList = iconv.decode(process.execSync('tasklist'), 'cp936');
  const taskArr = taskList.split('\r\n').map(item => item.split(' ').filter(dItem => dItem !== ''));
  return taskArr;
}
module.exports = getTaskList;
