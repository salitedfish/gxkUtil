import { useDebounce, useAxios } from "./util";
const service = useAxios("/", 10000);
service("POST", "/d").then((res) => {
  if (res) {
    res.status;
  }
});
console.log(useDebounce);
