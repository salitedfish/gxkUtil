import * as useDataOperate from "../util/dataOperate";

const obj = { a: 1, b: { a: 1, b: 2 }, c: [1, 2, 3, null, undefined], d: null };
const cloneObj = useDataOperate.useDeepClone(obj);

/**test useDeepClone */
test("test useDeepClone", () => {
  expect(useDataOperate.useDeepCompare(obj, cloneObj) && obj !== cloneObj).toBe(true);
});

/**test useDeepCompare */
test("test useDeepCompare", () => {
  expect(useDataOperate.useDeepCompare(cloneObj, obj)).toBe(true);
});

/**test useDeepInclude */
test("test useDeepInclude", () => {
  expect(useDataOperate.useDeepInclude([obj], cloneObj)).toBe(true);
});

/**useDeepRmDuplication */
test("test useDeepRmDuplication", () => {
  const arr = [cloneObj, cloneObj, obj, obj];
  expect(useDataOperate.useDeepRmDuplication(arr).length).toBe(1);
});

/**useShallowRmDuplication */
test("test useShallowRmDuplication", () => {
  const arr = [cloneObj, cloneObj, obj, obj];
  expect(useDataOperate.useShallowRmDuplication(arr).length).toBe(2);
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
