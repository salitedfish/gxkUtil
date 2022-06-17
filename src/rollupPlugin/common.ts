export const useRollupPluginTest = () => {
  return {
    name: "rollup-plugin-test",
    load() {
      console.log("$v$--$v$");
    },
  };
};
