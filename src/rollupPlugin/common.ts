export const useRollupPluginTest = () => {
  return {
    name: "rollup-plugin-test",
    load() {
      console.log("加载文件依赖");
    },
  };
};
