const process = require('child_process');
const iconv = require('iconv-lite');
const prefix = 'd:/nodeJS/remote-cmd-for-liang/src/receiver/bat/';
const appList = {
  team_viewer: prefix + 'team_viewer.sh',
  xun_lei: prefix + 'xun_lei.sh',
}


function start(app) {
  const cmd = appList[app[0]];
  if (cmd) {
    const execStr = 'sh ' + cmd;
    try {
      const rst = process.execSync(execStr);
      const rstStr = iconv.decode(rst, 'cp936');
      console.log(rstStr);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = start;
