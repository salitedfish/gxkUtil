// const path = require("path");
// const resolve = (_path) => path.resolve(__dirname, _path);

module.exports = {
  env: {
    // browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser", // 配置ts解析器
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  plugins: ["@typescript-eslint"], // s使用插件对ts文件进行lint
  rules: {
    indent: ["error", 2],
    "@typescript-eslint/no-unused-vars": "error", // 这个针对ts文件的，no-unused-vars无法对ts文件正常lint
    "@typescript-eslint/no-this-alias": "error",
    "no-var": "error",
    "no-console": "off",
    quotes: ["error", "double"], // 双引号
    eqeqeq: ["error", "always"], // 全等
  },
};
