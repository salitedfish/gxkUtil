import path from "path";
import resolve from "rollup-plugin-node-resolve";
import rollupJSON from "@rollup/plugin-json";
import commonjs from "rollup-plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import packageJSON from "./package.json";
import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import genPackageJson from "rollup-plugin-generate-package-json";

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

const babelPlugin = babel({
  exclude: "node_modules/**",
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

export default {
  input: getPath("./src/index.ts"),
  plugins: [babelPlugin, resolve(extensions), commonjs(), esPlugin, tsPlugin, rollupJSON(), packageJsonPlugin],
  output: { name: packageJSON.name, file: packageJSON.module, format: "es" },
};
