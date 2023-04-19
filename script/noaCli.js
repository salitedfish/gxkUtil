#!/usr/bin/env node
// const { exec } = require("process");

const packageJSON = require("../package.json");

// 结果信息和处理函数
const { name, version, author } = packageJSON;
const info = () => {
  console.log(process.argv);
  console.log(process.cwd());
  // exec("noa --name");
};

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
