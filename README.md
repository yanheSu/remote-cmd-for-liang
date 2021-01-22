# 介绍
项目分为两个子项目

> 为了最大限度的利用网络资源，在有线网络连接断开后，尝试连接 `wifi`
>
> `wifi` 限定名称为 `NWUNET`
>
> 如果只需要断网重连那么只需要部署 `receiver` 部分即可
>
> 获取全部功能需要自己准备一个云服务器
>
> 为了避免 windows 自动更新导致重启，建议将本 `receiver` 部分进程加入系统启动项
>
>**搜索关键词**
>
>`pm2` `windows/macos/linux` `开机自启`

## /src/server

服务端

部署在可被外网访问的云服务器上

作为中转站
## /src/receiver
接收端

部署在需要接受指令的 PC 上


# 前置条件

安装 `nodeJS` 要求版本 12 以上

安装 `yarn`
```shell
npm install -g yarn
```
# 初始化
在项目根目录执行
```shell
yarn install
```
安装守护进程
```
yarn global add pm2
```

> 需要加入系统启动项请自行根据系统平台搜索

# 配置
在 `src` 目录下新建 `.config.js` 文件 **不是 `config.js` 文件**
```js
module.exports = {
  path: '/path', // 自定义path
  server: '127.0.0.1', // 服务端地址
  username: 'xxx', // 自动填充 wifi 用户名
  password: 'xxx' // 自动填充 wifi 密码
};
```

# 启动

## server
在服务器上做好前置工作后
```
yarn run sr
```
## receiver
在需要的被控制的 PC 上运行以下指令
```
yarn run re
```

# 使用

## 执行命令
```
http://127.0.0.1:8888/path/add-job/ping/<命令>
```
命令格式
```
echo?hhhh&>&d:\desktop\test.txt
```
等价于
```
echo hhh > d:\desktop\test.txt
```

命令

```
test-command?a=1&-b=1
```
等价于
```
test-command a=1 -b=1
```

## 查看结果
```
http://127.0.0.1:8888/path/pong
```
