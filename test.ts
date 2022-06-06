import { useTimesClick } from "./index";
import util from "./index";

const resFun = useTimesClick(
  (a: number, b: string) => {
    console.log("点击了三次");
  },
  {
    times: 3,
  }
);

resFun(1, "3");

const a = util.useRemoveDuplication([1, 2, 3]);
const b = util.useRemoveDuplication(["f", "3", 3]);
