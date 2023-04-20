#!/usr/bin/env node

// 结果信息和处理函数
const packageJSON = require("../package.json");
const update = require("./update.cjs");
const info = require("./info.cjs");
const { name, version, author } = packageJSON;

// 命令行结果映射
const handlerMap = {
  "--name": name,
  "--n": name,
  "-N": name,
  "-n": name,
  "--version": version,
  "--v": version,
  "-V": version,
  "-v": version,
  "--author": author,
  "--info": info,
  "--update": update,
};

// 获取命令行参数列表
const params = process.argv.slice(2);

// 根据命令行的参数进行打印
for (const item of params) {
  const handler = handlerMap[item];
  if (handler) {
    if (handler instanceof Function) {
      handler();
    } else {
      console.log(handler);
    }
  }
}
