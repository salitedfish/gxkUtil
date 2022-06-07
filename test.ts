import { PromiseWithVoid, ResponseType } from "./type";
import { useTimesClick } from "./index";
import util from "./index";
import lib from "./lib";

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

/**usage */
const apiFetch = util.useFetch("/api", {
  headers: {
    token: "sdfsfdsfef",
  },
  handler: (res) => {
    return res;
  },
  errHandler: (err) => {},
});

const test = async (): PromiseWithVoid<ResponseType<{ a: number; b: number }>> => {
  return await apiFetch("/home", "GET", {
    params: { name: "gxk" },
    abortController: [],
  });
};

(async () => {
  const res = await test();
  if (res) {
    res.data.a;
  }
})();
