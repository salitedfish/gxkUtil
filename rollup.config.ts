import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import rollupJSON from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";
import babel from "@rollup/plugin-babel";
import genPackageJson from "rollup-plugin-generate-package-json";
import copy from "rollup-plugin-copy";
import packageJSON from "./package.json";
// import { terser } from "rollup-plugin-terser";
/**rollup-plugin test */
import { useRollupPluginTest } from "./src/plugin";

const getPath = (_path: string) => path.resolve(__dirname, _path);

/**解构package.json内容 */
const { config, name, version, dependencies, description } = packageJSON;
const { dest } = config;

/**ts解析插件 */
const tsPlugin = typescript({
  tsconfig: "tsconfig.json",
});

/**eslint插件 */
const esPlugin = eslint({
  typescript: require("ttypescript"),
  throwOnError: true,
  include: ["src/**/*.ts", "type/**/*.d.ts"],
  exclude: ["node_modules/**"],
});

/**babel插件 */
const babelPlugin = babel({
  exclude: "node_modules/**",
  babelHelpers: "bundled",
  extensions: [".ts", ".js"],
});

/**生成package.json插件 */
const packageJsonPlugin = genPackageJson({
  outputFolder: dest,
  baseContents: () => ({
    name,
    version,
    bin: {
      noa: "noaCli.js",
    },
    license: "MIT",
    main: "index.cjs",
    module: "index.mjs",
    typings: "src/index.d.ts",
    dependencies,
    description,
    sideEffects: false,
    keywords: ["typescript", "library"],
  }),
});

/**复制文件夹到指定文件夹 */
const rollupCopy = copy({
  targets: [
    { src: "src/css", dest },
    { src: "./readme.md", dest },
    { src: "./script/noaCli.js", dest: dest + "bin" },
  ],
});

export default () => {
  return {
    /**打包入口 */
    input: getPath("./src/index.ts"),
    /**排除外部引入的包 */
    external: Object.keys(dependencies),
    plugins: [
      nodeResolve({}),
      esPlugin,
      rollupJSON(),
      tsPlugin,
      babelPlugin,
      commonjs(),
      // terser(),
      packageJsonPlugin,
      rollupCopy,
      /**rollup-plugin test */
      useRollupPluginTest(),
    ],
    /**同时支持ESModule和commonjs导出 */
    output: [
      { file: `${dest}/index.mjs`, format: "esm", name },
      { file: `${dest}/index.cjs`, format: "cjs", name },
    ],
  };
};
