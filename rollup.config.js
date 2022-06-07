import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import rollupJSON from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import packageJSON from "./package.json";
import { eslint } from "rollup-plugin-eslint";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import genPackageJson from "rollup-plugin-generate-package-json";

const getPath = (_path) => path.resolve(__dirname, _path);

const tsPlugin = typescript({
  include: [".js", ".ts"],
  check: true,
});

const esPlugin = eslint({
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

const replacePlugin = replace({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  preventAssignment: true,
});

export default {
  input: getPath("./src/index.ts"),
  plugins: [resolve([".js", ".ts"]), commonjs(), replacePlugin, esPlugin, rollupJSON(), tsPlugin, babelPlugin, packageJsonPlugin],
  output: { file: packageJSON.module, format: "es" },
};
