const { default: axios } = require('axios');
const { port } = require('../config');
const config = require('../.config.js');
let serverAddress = config.server;
console.log(process.argv)
if (process.argv.includes('test')) {
    serverAddress = '127.0.0.1';
}

axios.defaults.headers['Content-Type'] = 'application/json';

axios.defaults.baseURL = `http://${serverAddress}:${port}` + config.path;

console.log(axios.defaults.baseURL);

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

module.exports = newRequest;
