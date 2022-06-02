import { useDebounce, useAxios, useDownloadByURL } from "./index";

const download = useDebounce(useDownloadByURL, 1000);
