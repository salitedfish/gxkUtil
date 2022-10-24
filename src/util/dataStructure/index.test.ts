import * as useDataStructure from ".";
import { useDeepEqual } from "../dataOperate";

/**test useLinkList */
test("test useLinkList", () => {
  const linkList = new useDataStructure.LinkList();
  linkList.append({ a: 1, b: 2 });
  linkList.append({ a: 2, b: 3 });
  linkList.append({ a: 3, b: 4 });
  linkList.append({ a: 4, b: 5 });
  expect(useDeepEqual(linkList.get(1), { a: 2, b: 3 })({})).toBe(true);
  linkList.set(1, { a: "1", b: "2" });
  expect(useDeepEqual(linkList.get(1), { a: "1", b: "2" })({})).toBe(true);
  linkList.insert(1, { a: 2, b: 3 });
  expect(useDeepEqual(linkList.get(1), { a: 2, b: 3 })({})).toBe(true);
});
