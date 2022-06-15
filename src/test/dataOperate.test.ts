import * as useCommon from "../util/dataOperate";

const obj = { a: 1, b: { a: 1, b: 2 }, c: [1, 2, 3] };
const cloneObj = useCommon.useDeepClone(obj);

test("test useDeepClone", () => {
  expect(useCommon.useDeepCompare(obj, cloneObj) && obj !== cloneObj).toBe(true);
});

test("test useDeepCompare", () => {
  expect(useCommon.useDeepCompare(cloneObj, obj)).toBe(true);
});

test("test useDeepInclude", () => {
  expect(useCommon.useDeepInclude([obj], cloneObj)).toBe(true);
});

test("test useDeepRmDuplication", () => {
  const arr = [cloneObj, cloneObj, cloneObj];
  expect(useCommon.useDeepRmDuplication(arr).length).toBe(1);
});

test("test useHidPartString", () => {
  expect(useCommon.useHidPartString("123456789", "between", [1, 1])).toBe("*2345678*");
  expect(useCommon.useHidPartString("123456789", "center", [1, 1])).toBe("1*******9");
  expect(useCommon.useHidPartString("123456789", "first", [4])).toBe("****56789");
  expect(useCommon.useHidPartString("123456789", "last", [4])).toBe("1234*****");
});
