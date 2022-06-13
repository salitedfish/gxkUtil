import * as useCommon from "../util/common";

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
