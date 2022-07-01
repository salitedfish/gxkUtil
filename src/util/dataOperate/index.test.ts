import * as useDataOperate from ".";

const f = new Map();
f.set("a", { a: 1 });
const g = new Map();
g.set("a", { a: 1 });
const obj = {
  a: 1,
  b: { a: 1, b: 2 },
  c: [1, 2, 3, null, undefined],
  d: null,
  e: new Set([1, 2, 3]),
  f,
};
const cloneObj = useDataOperate.useDeepClone(obj);

/**test useDeepClone */
test("test useDeepClone", () => {
  expect(useDataOperate.useDeepCompare(obj, cloneObj) && obj !== cloneObj).toBe(true);
});

/**test useDeepCompare */
test("test useDeepCompare", () => {
  expect(useDataOperate.useDeepCompare(cloneObj, obj)).toBe(true);
  expect(useDataOperate.useDeepCompare({ a: 1 }, { a: 1, b: 1 })).toBe(false);
  expect(useDataOperate.useDeepCompare([1, 2], [1, 2])).toBe(true);
  expect(useDataOperate.useDeepCompare(f, g)).toBe(true);
});

/**test useDeepInclude */
test("test useDeepInclude", () => {
  expect(useDataOperate.useDeepInclude([obj], cloneObj)).toBe(true);
  expect(useDataOperate.useDeepInclude([f], g)).toBe(true);
  expect(useDataOperate.useDeepInclude([obj, { a: 1, b: 1 }], { a: 1 })).toBe(false);
});

/**useDeepRmRpt */
test("test useDeepRmRpt", () => {
  const arr = [cloneObj, cloneObj, obj, obj];
  expect(useDataOperate.useDeepRmRpt(arr).length).toBe(1);
});

/**useShallowRmRpt */
test("test useShallowRmRpt", () => {
  const arr = [cloneObj, cloneObj, obj, obj];
  expect(useDataOperate.useShallowRmRpt(arr).length).toBe(2);
});

/**test useRepPartStr */
test("test useRepPartStr", () => {
  expect(useDataOperate.useRepPartStr("123456789", "between", [1, 1])).toBe("*2345678*");
  expect(useDataOperate.useRepPartStr("123456789", "center", [1, 1])).toBe("1*******9");
  expect(useDataOperate.useRepPartStr("123456789", "head", [4])).toBe("****56789");
  expect(useDataOperate.useRepPartStr("123456789", "tail", [4])).toBe("1234*****");
});

/**test useTrimStr */
test("test useTrimStr", () => {
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "between")).toBe("123 4567 89");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ")).toBe("123456789");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "head")).toBe("123 4567 89 ");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "tail")).toBe(" 123 4567 89");
});
