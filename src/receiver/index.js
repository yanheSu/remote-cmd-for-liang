// const server = '47.104.215.68';
const { default: axios } = require('axios');
const { port } = require('../config');
let serverAddress = '47.104.215.68';

console.log(process.argv);
if (process.argv.includes('test')) {
    serverAddress = '127.0.0.1';
}

console.log(port);

const CHECK_INTERVAL = 5000;
let lastCheckTime = 0;
axios.defaults.baseURL = `http://${serverAddress}:${port}`;

const newRequest = (url, method = 'get', queryParams = {}, data = {}) =>
  new Promise((resolve, reject) => {
    axios.request({
      method,
      url,
      data,
      params: queryParams
    }).then((response) => {
      resolve(response.data);
    }).catch((e) => {
      reject(e);
    });
  });

async function main() {
  const data = await consumeJob();
  console.log(data);
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
    main();
  }
}

loop();
