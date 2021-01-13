const process = require('child_process');
const prefix = 'd:/nodeJS/remote-cmd-for-liang/src/receiver/bat/';
const appList = {
  team_viewer: prefix + 'team_viewer.sh',
  xun_lei: prefix + 'xun_lei.sh',
}


function start(app) {
  const cmd = appList[app];
  if (cmd) {
    const execStr = 'sh ' + cmd;
    process.execSync(execStr);
  }
}

module.exports = start;
