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
const h = {
  a: new Set(),
  b: 0,
  c: new Map(),
};
const i = [new Set(), 0, new Map()];
const cloneObj = useDataOperate.useDeepClone(obj);

/**test useCheckEmptyInObj */
test("test useCheckEmptyInObj", () => {
  expect(useDataOperate.useCheckEmptyInObj(obj)()).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj(obj)([null])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj(obj)([0])).toBe(true);
  expect(useDataOperate.useCheckEmptyInObj({ a: 0, b: null })([0, null])).toBe(false);
  expect(useDataOperate.useCheckEmptyInObj({ a: 0, b: null })()).toBe(true);
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
  expect(useDataOperate.useDeepEqual(obj, cloneObj) && obj !== cloneObj).toBe(true);
});

/**test useDeepEqual */
test("test useDeepEqual", () => {
  expect(useDataOperate.useDeepEqual(cloneObj, obj)).toBe(true);
  expect(useDataOperate.useDeepEqual({ a: 1 }, { a: 1, b: 1 })).toBe(false);
  expect(useDataOperate.useDeepEqual([1, 2], [1, 2])).toBe(true);
  expect(useDataOperate.useDeepEqual(f, g)).toBe(true);
  expect(useDataOperate.useDeepEqual(new Set([1, 2, 3]), [])).toBe(false);
  expect(useDataOperate.useDeepEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
  expect(useDataOperate.useDeepEqual(new Set([1, 2, 3]), new Set([1, 2]))).toBe(false);
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

/**useGroupBy */
test("test useGroupBy", () => {
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
  const resGroup = useDataOperate.useGroupBy(arr)({ conditions });
  const retGroup = useDataOperate.useGroupBy(arr, { conditions });
  const regGroup = useDataOperate.useGroupBy(arrNew, { arrayCount: 2 });
  const rexGroup = useDataOperate.useGroupBy(arrNew)({ eatchCount: 4 });
  const rekGroup = useDataOperate.useGroupBy(arrNew)({ condition: (item) => item.a > 2 });
  const remGroup = useDataOperate.useGroupBy(arrNew)({ condition: (item) => item.a % 2 });
  const renGroup = useDataOperate.useGroupBy(arrNew)({ condition: (item) => (item.a % 2) + item.b });
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
  expect(useDataOperate.useDeepEqual(resGroup)(resGropRef)).toBe(true);
  expect(useDataOperate.useDeepEqual(retGroup, resGropRef)).toBe(true);
  expect(useDataOperate.useDeepEqual(regGroup, regGropRef)).toBe(true);
  expect(useDataOperate.useDeepEqual(rexGroup, rexGropRef)).toBe(true);
  expect(useDataOperate.useDeepEqual(rekGroup, rekGropRef)).toBe(true);
  expect(useDataOperate.useDeepEqual(remGroup, remGropRef)).toBe(true);
  expect(useDataOperate.useDeepEqual(renGroup, renGropRef)).toBe(true);
});

/**test useRepPartStr */
test("test useRepPartStr", () => {
  expect(useDataOperate.useRepPartStr("123456789", "between", [1, 1], "?")).toBe("?2345678?");
  expect(useDataOperate.useRepPartStr("123456789", "center", [1, 1])).toBe("1*******9");
  expect(useDataOperate.useRepPartStr("123456789", "head", [4])).toBe("****56789");
  expect(useDataOperate.useRepPartStr("123456789", "tail", [4])).toBe("1234*****");
  expect(useDataOperate.useRepPartStr("123456789", "tail", [4], "/")).toBe("1234/////");
});

/**test useTrimStr */
test("test useTrimStr", () => {
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "between")).toBe("123 4567 89");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ", "head")).toBe("123 4567 89 ");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ")("tail")).toBe(" 123 4567 89");
  expect(useDataOperate.useTrimStr(" 123 4567 89 ")("global")).toBe("123456789");
});

/**test useSetFirstSign */
test("test useSetFirstSign", () => {
  const resOne = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 2 }, { b: 1 }])((item) => Number(item.a) + 1);
  const resTwo = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 1 }, { b: 1 }])((item) => item.b);
  const resThree = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 2 }, { b: 1 }, { a: 1 }], (item) => item.a);
  const resFour = useDataOperate.useSetFirstSign([{ a: 1 }, { a: 2 }, { b: 1 }], (item) => typeof item.a);

  expect(
    useDataOperate.useDeepEqual(resOne, [
      { a: 1, firstSign: true },
      { a: 2, firstSign: true },
      { b: 1, firstSign: true },
    ])
  ).toBe(true);
  expect(useDataOperate.useDeepEqual(resTwo, [{ a: 1, firstSign: true }, { a: 1 }, { b: 1, firstSign: true }])).toBe(true);
  expect(useDataOperate.useDeepEqual(resThree, [{ a: 1, firstSign: true }, { a: 2, firstSign: true }, { b: 1, firstSign: true }, { a: 1 }])).toBe(true);
  expect(useDataOperate.useDeepEqual(resFour, [{ a: 1, firstSign: true }, { a: 2 }, { b: 1, firstSign: true }])).toBe(true);
});
