#!/usr/bin/env node
// gxk 指令是随便玩的

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
