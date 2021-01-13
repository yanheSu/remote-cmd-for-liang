const process = require('child_process');
const newRequest = require('../request');

function customTask(cmd, params) {
  try {
    let param = '';
    Object.keys(params).forEach(key => {
      param += ` ${key}`
      if (params[key] !== '') {
        param += `=${params[key]}`;
      }
    })
    let execStr = cmd[0] + param;
    const rst = process.execSync(execStr, { encoding: 'utf8' }).toString();
    console.log(rst);
    newRequest('/ping', 'post', {}, {result: rst});
  } catch (e) {
    newRequest('/ping', 'post', {}, {result: 'error occuer!' + e});
  }
}

module.exports = customTask;
