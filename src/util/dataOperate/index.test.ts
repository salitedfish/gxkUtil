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
  g: () => {
    return true;
  },
};
const h = {
  a: new Set(),
  b: 0,
  c: new Map(),
};
const mbj = {
  a: 1,
  b: { a: 1, b: 2 },
  c: [1, 2, 3, null, null],
  d: null,
};
const i = [new Set(), 0, new Map()];
/**不拷贝函数、Map、Set*/
const simpleCloneObj = useDataOperate.useDeepClone(obj)({});
const simpleCloneMbj = useDataOperate.useDeepClone(mbj, {});
/**完全深拷贝*/
const cloneObj = useDataOperate.useDeepClone(obj)({ complete: true });

/**test useCheckEmptyInObj */
test("test useCheckEmptyInObj", () => {
  expect(useDataOperate.useCheckEmptyInObj(obj)([])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj(obj)([null])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj(obj)([0])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj({ a: 0, b: null })([0, null])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj({ a: 0, b: null })([])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj([0, null], [0, null])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj([0, []], [0])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj([0, []], [0, []])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj([0, {}], [0, {}])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj([0, null, undefined])([0, null])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj(h)([new Set(), 0])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj(h)([new Set(), 0, new Map()])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj(i)([new Set(), 0])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj(i)([new Set(), 0, new Map()])).toBe(false);
});

/**test useIsPositiveInt */
test("test useIsPositiveInt", () => {
  expect(useDataOperate.useIsPositiveInt(1)).toBe(true);
  expect(useDataOperate.useIsPositiveInt(0)).toBe(false);
  expect(useDataOperate.useIsPositiveInt(1.1)).toBe(false);
  expect(useDataOperate.useIsPositiveInt(-1)).toBe(false);
  expect(useDataOperate.useIsPositiveInt(-1.1)).toBe(false);
  expect(useDataOperate.useIsPositiveInt(NaN)).toBe(false);
});

/**test useDeepClone */
test("test useDeepClone", () => {
  expect(useDataOperate.useDeepEqual(obj, simpleCloneObj)({ complete: true })).toBe(false);
  expect(useDataOperate.useDeepEqual(mbj, simpleCloneMbj)({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual(obj, cloneObj)({ complete: true }) && obj !== cloneObj).toBe(true);
});

/**test useDeepEqual */
test("test useDeepEqual", () => {
  expect(useDataOperate.useDeepEqual(cloneObj, obj)({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual({ a: 1 }, { a: 1, b: 1 })({})).toBe(false);
  expect(useDataOperate.useDeepEqual([1, 2], [1, 2])({})).toBe(true);
  expect(useDataOperate.useDeepEqual(f, g)({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual(new Set([1, 2, 3]), [])({ complete: true })).toBe(false);
  expect(useDataOperate.useDeepEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual(new Set([1, 2, 3]), new Set([1, 2]))({ complete: true })).toBe(false);
  expect(useDataOperate.useDeepEqual(NaN, NaN)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(NaN, NaN)({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual({ a: NaN }, { a: NaN })({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual({ a: NaN }, { a: "ERE" })({ complete: true })).toBe(false);
});

/**test useDeepInclude */
test("test useDeepInclude", () => {
  expect(useDataOperate.useDeepInclude([obj], cloneObj)).toBe("0");
  expect(useDataOperate.useDeepInclude([1, f], g)).toBe("1");
  expect(useDataOperate.useDeepInclude([obj, { a: 1, b: 1 }], { a: 1, b: 2 })).toBe(false);
  expect(useDataOperate.useDeepInclude([obj, { a: 1, b: 1 }])((item) => item.a === 1)).toBe("0");
  expect(useDataOperate.useDeepInclude([obj, { a: 1, b: 1 }])((item) => item.a > 1)).toBe(false);
  expect(useDataOperate.useDeepInclude([obj, { a: 1, b: 1 }])((item) => item.b === 1)).toBe("1");
  expect(useDataOperate.useDeepInclude([0, 1, 2, 3, 4, 5, 6])(2)).toBe("2");
  expect(useDataOperate.useDeepInclude([0, 1, 2, 3, 4, 5, 6])((item) => item === 2)).toBe("2");
  expect(useDataOperate.useDeepInclude([0, new Set([1, 2, 3]), 2])(new Set([1, 2, 3]))).toBe("1");
  expect(useDataOperate.useDeepInclude([0, [1, 2, 3], 2])([1, 2, 3])).toBe("1");
  expect(
    useDataOperate.useDeepInclude([
      { name: "c", path: "c", query: { age: 0, name: "gxl" } },
      "",
      { name: "c", path: "c", query: { age: 0, name: "gxl" } },
      9,
      { name: "c", path: "c", query: { age: 0, name: "gxl" } },
      { name: "a", path: "a", query: { age: 1, name: "gxk" } },
      { name: "b", path: "b", query: { age: 2, name: "gxh" } },
    ])({ name: "a", path: "a", query: { age: 1, name: "gxk" } })
  ).toBe("5");
  expect(
    useDataOperate.useDeepInclude([
      { name: "c", path: "c", query: { age: 0, name: "gxl" } },
      "",
      { name: "c", path: "c", query: { age: 0, name: "gxl" } },
      9,
      { name: "c", path: "c", query: { age: 0, name: "gxl" } },
      { name: "a", path: "a", query: { age: 1, name: "gxk" } },
      { name: "b", path: "b", query: { age: 2, name: "gxh" } },
    ])((item) => (item as any).name === "b")
  ).toBe("6");
  expect(useDataOperate.useDeepInclude([0, [undefined, 2, 3], 2])([undefined, 2, 3])).toBe("1");
});

/**useRmRpt */
test("test useRmRepeat", () => {
  const arr = [cloneObj, cloneObj, obj, obj];
  expect(useDataOperate.useRmRepeat(arr, { deep: true }).length).toBe(1);
  expect(useDataOperate.useRmRepeat(arr)({ deep: false }).length).toBe(2);
  expect(useDataOperate.useRmRepeat(arr)({ deep: false, condition: (item) => item.a }).length).toBe(1);
  expect(useDataOperate.useRmRepeat(arr)({ deep: false, condition: (item) => item.b, pure: true }).length).toBe(2);
  expect(useDataOperate.useRmRepeat(arr)({ deep: true, condition: (item) => item.b, pure: true }).length).toBe(1);
});

/**useGroupByCondition */
test("test useGroupByCondition", () => {
  type Item = {
    a: number;
    b: number;
  };
  const conditions = [(item: Item) => item.a >= 3, (item: Item) => item.a < 3];
  const arr = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 4, b: 5 },
    { a: 5, b: 6 },
    { a: 6, b: 7 },
  ];
  const arrNew = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 4, b: 5 },
    { a: 5, b: 6 },
  ];
  const resGroup = useDataOperate.useGroupByCondition(arr)({ conditions });
  const retGroup = useDataOperate.useGroupByCondition(arr, { conditions });
  const regGroup = useDataOperate.useGroupByCondition(arrNew, { arrayCount: 2 });
  const rexGroup = useDataOperate.useGroupByCondition(arrNew)({ eatchCount: 4 });
  const rekGroup = useDataOperate.useGroupByCondition(arrNew)({ condition: (item) => item.a > 2 });
  const remGroup = useDataOperate.useGroupByCondition(arrNew)({ condition: (item) => item.a % 2 });
  const renGroup = useDataOperate.useGroupByCondition(arrNew)({ condition: (item) => (item.a % 2) + item.b });
  const resGropRef = [
    [
      { a: 3, b: 4 },
      { a: 4, b: 5 },
      { a: 5, b: 6 },
      { a: 6, b: 7 },
    ],
    [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
  ];
  const regGropRef = [
    [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
    [
      { a: 3, b: 4 },
      { a: 4, b: 5 },
    ],
    [{ a: 5, b: 6 }],
  ];
  const rexGropRef = [
    [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 5 },
    ],
    [{ a: 5, b: 6 }],
  ];
  const rekGropRef = [
    [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
    [
      { a: 3, b: 4 },
      { a: 4, b: 5 },
      { a: 5, b: 6 },
    ],
  ];
  const remGropRef = [
    [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
      { a: 5, b: 6 },
    ],
    [
      { a: 2, b: 3 },
      { a: 4, b: 5 },
    ],
  ];
  const renGropRef = [
    [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
    [
      { a: 3, b: 4 },
      { a: 4, b: 5 },
    ],
    [{ a: 5, b: 6 }],
  ];
  expect(useDataOperate.useDeepEqual(resGroup)(resGropRef)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(retGroup, resGropRef)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(regGroup, regGropRef)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(rexGroup, rexGropRef)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(rekGroup, rekGropRef)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(remGroup, remGropRef)({})).toBe(true);
  expect(useDataOperate.useDeepEqual(renGroup, renGropRef)({})).toBe(true);
});

/**test useRepPartStr */
test("test useRepPartStr", () => {
  expect(useDataOperate.useRepPartStr("123456789", "between", [1, 1], "?")).toBe("?2345678?");
  expect(useDataOperate.useRepPartStr("123456789", "center", [1, 1])).toBe("1*******9");
  expect(useDataOperate.useRepPartStr("123456789", "left", [4])).toBe("****56789");
  expect(useDataOperate.useRepPartStr("123456789", "right", [4])).toBe("1234*****");
  expect(useDataOperate.useRepPartStr("123456789", "right", [4], "/")).toBe("1234/////");
});

/**test useTrimStr */
test("test useTrimStr", () => {
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "between")).toBe("123 4567 89");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "left")).toBe("123 4567 89 ");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ")("right")).toBe(" 123 4567 89");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ")("global")).toBe("123456789");
});

/**test useSetFirstSign */
test("test useSetFirstSign", () => {
  const resOne = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 2 }, { b: 1 }])({ condition: (item) => Number(item.a) + 1 });
  const resTwo = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 1 }, { b: 1 }])({ condition: (item) => item.b, pure: true });
  const resThree = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 2 }, { b: 1 }, { a: 1 }], { condition: (item) => item.a });
  const resFour = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 2 }, { b: 1 }], { condition: (item) => typeof item.a, pure: true });

  expect(
    useDataOperate.useDeepEqual(resOne, [
      { a: 1, firstSign: true },
      { a: 2, firstSign: true },
      { b: 1, firstSign: true },
    ])({})
  ).toBe(true);
  expect(useDataOperate.useDeepEqual(resTwo, [{ a: 1, firstSign: true }, { a: 1 }, { b: 1, firstSign: true }])({})).toBe(true);
  expect(useDataOperate.useDeepEqual(resThree, [{ a: 1, firstSign: true }, { a: 2, firstSign: true }, { b: 1, firstSign: true }, { a: 1 }])({ complete: true })).toBe(true);
  expect(useDataOperate.useDeepEqual(resFour, [{ a: 1, firstSign: true }, { a: 2 }, { b: 1, firstSign: true }])({})).toBe(true);
});
