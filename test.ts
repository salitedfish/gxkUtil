import { useDebounce } from "./index";
const handle = (a: number, b: number) => {};
const test = useDebounce(handle, 2000);

test(1, 1);
