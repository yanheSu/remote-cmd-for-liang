const process = require('child_process');
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
      process.execSync(execStr, { encoding: 'utf8' });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = start;
