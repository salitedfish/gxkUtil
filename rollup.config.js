import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import rollupJSON from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";
import babel from "@rollup/plugin-babel";
// import replace from "@rollup/plugin-replace";
import genPackageJson from "rollup-plugin-generate-package-json";
import packageJSON from "./package.json";

const getPath = (_path) => path.resolve(__dirname, _path);

const tsPlugin = typescript({
  tsconfig: "tsconfig.json",
  extensions: [".ts", ".js"],
});

const esPlugin = eslint({
  typescript: require("ttypescript"),
  throwOnError: true,
  include: ["src/**/*.ts", "type/**/*.d.ts"],
  exclude: ["node_modules/**"],
});

const babelPlugin = babel({
  exclude: "node_modules/**",
  babelHelpers: "bundled",
  extensions: [".ts", ".js"],
});

const packageJsonPlugin = genPackageJson({
  outputFolder: "lib",
  baseContents: () => ({
    name: packageJSON.name,
    version: packageJSON.version,
    license: "MIT",
    main: "index.js",
    typings: "index.d.ts",
    dependencies: packageJSON.dependencies,
  }),
});

// const replacePlugin = replace({
//   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
//   preventAssignment: true,
// });

export default {
  input: getPath("./src/index.ts"),
  plugins: [resolve([".js", ".ts"]), esPlugin, rollupJSON(), tsPlugin, babelPlugin, commonjs(), packageJsonPlugin],
  output: { file: packageJSON.module, format: "es", name: packageJSON.name },
};
