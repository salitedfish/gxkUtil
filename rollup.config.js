import path from "path";
import resolve from "rollup-plugin-node-resolve";
import rollupJSON from "@rollup/plugin-json";
import commonjs from "rollup-plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import packageJSON from "./package.json";
import { eslint } from "rollup-plugin-eslint";

const getPath = (_path) => path.resolve(__dirname, _path);

const extensions = [".js", ".ts"];

const tsPlugin = ts({
  tsconfig: getPath("./tsconfig.json"),
  extensions,
});

const esPlugin = eslint({
  throwOnError: true,
  include: ["src/**/*.ts", "type/**/*.d.ts"],
  exclude: ["node_modules/**"],
});

const commonConf = {
  input: getPath("./index.ts"),
  plugins: [resolve(extensions), commonjs(), esPlugin, tsPlugin, rollupJSON()],
};

const outputMap = [
  {
    file: packageJSON.main,
    format: "umd",
  },
  {
    file: packageJSON.module,
    format: "es",
  },
];

const buildConf = (options) => {
  return Object.assign({}, commonConf, options);
};

export default outputMap.map((output) => {
  return buildConf({
    output: { name: packageJSON.name, ...output },
  });
});
