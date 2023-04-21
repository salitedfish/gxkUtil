#!/usr/bin/env node

// 结果信息和处理函数
const packageJSON = require("../package.json");
const update = require("./update.cjs");
const { name, version, author } = packageJSON;

// 命令行结果映射
const handlerMap = {
  "--name": name,
  "-N": name,
  "-n": name,
  "--version": version,
  "-V": version,
  "-v": version,
  "--author": author,
  "--update": update,
  "-U": update,
  "-u": update,
};

// 获取命令行指令和参数列表
const option = process.argv[2];
const argvs = process.argv.slice(3);

// 根据命令行的参数进行打印
const handler = handlerMap[option];
if (handler) {
  if (handler instanceof Function) {
    handler(argvs);
  } else {
    console.log(handler);
  }
}
