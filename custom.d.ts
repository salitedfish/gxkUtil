declare module "rollup-plugin-eslint";

declare module "rollup-plugin-generate-package-json";

// 懒得每个类型都定义了，所有都定义为Obj
type Obj<T = any> = Record<string, T>;
