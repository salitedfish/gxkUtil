import * as useCurry from ".";

/**test useCurryTwo */
test("test useCurryTwo", () => {
  const sum = (a: number, b: number = 1) => {
    return a + b;
  };
  const sumCurry = useCurry.useCurryTwo<[a: number], [b?: number], number>(sum);
  expect(sumCurry(1)()).toBe(2);
  expect(sumCurry(1)(2)).toBe(3);
  expect(sumCurry(1, 2)).toBe(3);
});

/**test useCurryThree */
test("test useCurryThree", () => {
  const sum = (a: number, b: number, c: number = 1) => {
    return a + b + c;
  };
  const sumCurry = useCurry.useCurryThree<[a: number], [b: number], [c?: number], number>(sum);
  expect(sumCurry(1)(2)()).toBe(4);
  expect(sumCurry(1, 2, 1)).toBe(4);
  expect(sumCurry(1, 2)(1)).toBe(4);
});

/**test useCurryFour */
test("test useCurryFour", () => {
  const sum = (a: number, b: number, c: number, d: string) => {
    return a + b + c + d;
  };
  const sumCurry = useCurry.useCurryFour<[a: number], [b: number], [c: number], [d: string], string>(sum);
  expect(sumCurry(1)(2)(3)("4")).toBe("64");
  expect(sumCurry(1, 2, 1)("2")).toBe("42");
  expect(sumCurry(1, 2)(1)("2")).toBe("42");
});
