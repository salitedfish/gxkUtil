import * as useCurry from ".";

/**test useCurryTwo */
test("test useGenParamsUrl", () => {
  const sum = (a: number, b: number) => {
    return a + b;
  };
  const sumCurry = useCurry.useCurryTwo<[a: number], [b: number], number>(sum);
  expect(sumCurry(1)(2)).toBe(3);
  expect(sumCurry(1, 2)).toBe(3);
});

/**test useCurryThree */
test("test useGenParamsUrl", () => {
  const sum = (a: number, b: number, c: number = 1) => {
    return a + b + c;
  };
  const sumCurry = useCurry.useCurryThree<[a: number], [b: number], [c: number], number>(sum);
  expect(sumCurry(1)(2)(3)).toBe(6);
  expect(sumCurry(1, 2, 1)).toBe(4);
  expect(sumCurry(1, 2)(1)).toBe(4);
});
