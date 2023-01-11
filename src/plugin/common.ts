export const useRollupPluginTest = () => {
  let count = 0;
  return {
    name: "rollup-plugin-test",
    // options(source: unknown) {
    //   console.log("options", source);
    // },
    // buildStart(source: any) {
    // },
    // resolveId(source: string,) {
    //   console.log("source", source);
    // },
    load() {
      count++;
      console.log(`第${count}个文件`);
    },
    // load(source: string) {
    //   count = count + 1;
    //   console.log(`第${count}个文件`, source);
    // },
    // transform(source: unknown) {
    //   console.log("transform", source);
    // },
    // moduleParsed(source: unknown) {
    //   console.log("moduleParsed", source);
    // },
    // resolveDynamicImport(source: unknown) {
    //   console.log("resolveDynamicImport", source);
    // },
    // buildEnd(source: unknown) {
    //   console.log("buildEnd", source || "bundle success !!!");
    // },
    // outputOptions(source: unknown) {
    //   console.log("outputOptions", source);
    // },
    // closeBundle(source: unknown) {
    //   console.log("closeBundle", source);
    // },
  };
};
