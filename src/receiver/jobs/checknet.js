const { default: axios } = require('axios');
const puppeteer = require('puppeteer');
const process = require('child_process');
const iconv = require('iconv-lite');
const config = require('../../.config.js');

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
    login();
  } catch (e) {
    console.error(e);
  }
}

async function login() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.bilibili.com');
    setTimeout(() => {
      await page.$eval('input[name=DDDDD]', input => {
        input.value = config.username;
      });
      await page.$eval('input[name=upass]', input => {
        input.value = config.password;
      });
      await page.click('input[name=0MKKey]')

      setTimeout(() => {
        await browser.close();
      }, 5000);
    }, 10000);

  } catch (e) {
    console.error('login error');
  }
}

module.exports = checkNet;
