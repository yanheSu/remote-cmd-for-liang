const { default: axios } = require("axios");
const process = require('child_process');
const iconv = require('iconv-lite');

const NET_CHECK_TIMES = 10;
const NET_CHECK_INTERVAL = 3000;
const NET_CHECK_RANGE = 100000;


let first_check_time = Infinity;
let net_check_count = 0;
function checkNet() {
  axios.get('https://www.baidu.com').catch(err => {
    console.error('network maybe lost....');
    if (err) {
      const now = Date.now();
      if (now < first_check_time) {
        first_check_time = now;
        setTimeout(() => {
          if (net_check_count > NET_CHECK_TIMES) {
            net_check_count = 0;
            first_check_time = Infinity;
          }
          changeNet();
        }, NET_CHECK_RANGE);
      }
      net_check_count++;
    }
  });
}

function changeNet() {
  try {
    const rst = process.execSync('netsh wlan connect name=NWUNET');
    const rstStr = iconv.decode(rst, 'cp936');
    console.log(rstStr);
  } catch (e) {
    console.error(e);
  }
}

module.exports = checkNet;
