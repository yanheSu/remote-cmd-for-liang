const { default: axios } = require('axios');
const puppeteer = require('puppeteer');
const process = require('child_process');
const iconv = require('iconv-lite');
const config = require('../../.config.js');

const NET_CHECK_TIMES = 6;
const NET_CHECK_RANGE = 100000;

let isConnecting = false;


let first_check_time = Infinity;
let net_check_count = 0;
function checkNet() {
  axios.get('https://www.baidu.com').catch(err => {
    console.error('network maybe lost....');
    if (err && !isConnecting) {
      const now = Date.now();
      if (now < first_check_time) {
        first_check_time = now;
        setTimeout(() => {
          if (net_check_count > NET_CHECK_TIMES) {
            net_check_count = 0;
            first_check_time = Infinity;
          }
          // 禁止过于频繁的连接，导致开启过多的 chromium 占用资源
          if (!isConnecting) {
            changeNet();
          }
        }, NET_CHECK_RANGE);
      }
      net_check_count++;
    }
  });
}

function changeNet() {
  try {
    isConnecting = true;
    const rst = process.execSync('netsh wlan connect name=NWUNET');
    const rstStr = iconv.decode(rst, 'cp936');
    console.log(rstStr);
    login();
  } catch (e) {
    console.error(e);
    isConnecting = false;
  }
}

async function login() {
  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    // 西北大 特供 wifi 连接
    await page.goto('http://10.0.1.242/a70.htm');
    // 异步等待页面加载完成
    setTimeout(async () => {
      try {
        console.log('wait to type username...');
        await page.$$eval('input[name=DDDDD]', (input, value) => {
          input[1].value = value;
        }, config.username);
        await page.$$eval('input[name=upass]', (input, value) => {
          input[1].value = value;
        }, config.password);
        try {
          // 西大限定 登陆按钮位置
          await page.mouse.click(704, 387);
          setTimeout(async () => {
            try {
              await browser.close();
              isConnecting = false;
            } catch (e) {
              isConnecting = false;
            }
          }, 5000);
        } catch(e) {
          console.log(e);
          isConnecting = false;
        }
      } catch (e) {
        console.error('select input error');
        isConnecting = false;
      }
    }, 10000);

  } catch (e) {
    isConnecting = false;
    console.error('login error');
  }
}

module.exports = checkNet;
