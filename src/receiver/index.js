// const server = '47.104.215.68';
const checkNet = require('./jobs/checknet');
const customTask = require('./jobs/custom');
const startTask = require('./jobs/startTask');
const stopTask = require('./jobs/stopTask');
const newRequest = require('./request');


const CHECK_INTERVAL = 5000;
let lastCheckTime = 0;

async function main() {
  console.log(1);
  let data;
  try {
    data = await consumeJob();
  } catch (e) {
    console.error('ah...');
  }
  if (data && data.job && data.params) {
    console.log(data);
    const cmdList = data.job.split('/');
    if (cmdList.length) {
      const cmd = cmdList[0];
      const cmdArgs = cmdList.slice(1);
      switch(cmd) {
        case 'start':
          startTask(cmdArgs);
        break;
        case 'stop':
          stopTask(cmdArgs);
        break;
        case 'ping':
          customTask(cmdArgs, data.params);
        break;
      }
    }
  }
}

async function checkJob() {
  return newRequest('/check-job');
}

async function consumeJob() {
  return newRequest('/consume-job');
}

function loop() {
  setImmediate(loop);
  const now = +new Date();
  if (now - lastCheckTime > CHECK_INTERVAL) {
    lastCheckTime = now;
    main().catch();
    checkNet();
  }
}

loop();
